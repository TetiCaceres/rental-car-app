'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { FaExclamationCircle } from 'react-icons/fa';
import { createBookingRequest } from '@/lib/api/rental';
import css from './RentalForm.module.css';

interface RentalFormProps {
  carId: string;
  carName: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  comment?: string;
}

export default function RentalForm({ carId }: RentalFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  const mutation = useMutation({
    mutationFn: (data: { name: string; email: string; comment: string }) =>
      createBookingRequest(carId, data),
    onSuccess: response => {
      setNotification(response.message);
      setErrors({});
      setName('');
      setEmail('');
      setComment('');
    },
    onError: () => {
      setNotification('Something went wrong. Please try again.');
    },
  });

  const validate = (): FieldErrors => {
    const newErrors: FieldErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-zА-Яа-яЇїІіЄєҐґ\s'-]+$/;

    if (!name.trim()) {
      newErrors.name = 'Please enter your name.';
    } else if (!nameRegex.test(name)) {
      newErrors.name = 'Name must not contain numbers.';
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email.';
    }

    if (!comment.trim()) {
      newErrors.comment = 'Comment is required.';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    mutation.mutate({ name, email, comment });
  };

  return (
    <div className={css.formWrapper}>
      <div className={css.header}>
        <h2 className={css.title}>Book your car now</h2>
        <p className={css.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <form className={css.form} onSubmit={handleSubmit} noValidate>
        <div className={css.field}>
          <div className={css.inputWrapper}>
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={name}
              onChange={e => setName(e.target.value)}
              className={`${css.input} ${errors.name ? css.inputError : ''}`}
            />
            {errors.name && <FaExclamationCircle className={css.errorIcon} />}
          </div>
          {errors.name && <p className={css.errorText}>{errors.name}</p>}
        </div>

        <div className={css.field}>
          <div className={css.inputWrapper}>
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`${css.input} ${errors.email ? css.inputError : ''}`}
            />
            {errors.email && <FaExclamationCircle className={css.errorIcon} />}
          </div>
          {errors.email && <p className={css.errorText}>{errors.email}</p>}
        </div>

        <div className={css.field}>
          <div className={css.inputWrapper}>
            <textarea
              name="comment"
              placeholder="Comment"
              rows={4}
              value={comment}
              onChange={e => setComment(e.target.value)}
              className={`${css.textarea} ${errors.comment ? css.inputError : ''}`}
            />
            {errors.comment && (
              <FaExclamationCircle className={css.errorIconTextarea} />
            )}
          </div>
          {errors.comment && <p className={css.errorText}>{errors.comment}</p>}
        </div>

        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Sending...' : 'Send'}
        </button>
      </form>

      {notification && <p className={css.notification}>{notification}</p>}
    </div>
  );
}
