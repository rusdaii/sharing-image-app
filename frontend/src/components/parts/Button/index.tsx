'use client';

import React, { FC, useMemo } from 'react';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  href?: string;
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  type = 'button',
  children,
  className,
  href,
  isLoading,
  loadingText,
  disabled,
  ...props
}) => {
  const finalClassName = useMemo(
    () => twMerge('btn btn-primary', className),
    [className]
  );

  if (href) {
    return (
      <Link href={href}>
        <button type="button" className={finalClassName} {...props}>
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={finalClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="loading loading-spinner" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
