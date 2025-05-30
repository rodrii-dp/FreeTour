import {useState} from 'react';
import {isValidEmail, isValidPassword} from '../../utils/validations';

type InputFields = {
  [key: string]: string;
};

export const useFormValidation = <T extends Record<string, any>>(
  initialFields: InputFields,
) => {
  const [fields, setFields] = useState<T>(initialFields);
  const [error, setError] = useState('');

  const handleInputChange = (field: keyof T, value: string) => {
    setFields(prev => ({...prev, [field]: value}));
  };

  const validateForm = () => {
    for (const key in fields) {
      if (!fields[key]) {
        setError('Rellena todos los campos');
        return false;
      }
    }

    if (fields.email && !isValidEmail(fields.email.trim())) {
      setError('Introduce una dirección de correo electrónico válida');
      return false;
    }

    if (fields.password && !isValidPassword(fields.password.trim())) {
      setError(
        'La contraseña debe contener al menos ocho caracteres incluyendo una minúscula, una mayúscula, un símbolo y un número',
      );
      return false;
    }

    setError('');
    return true;
  };

  const validatePasswords = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setError('Las contraseñas deben coincidir');
      return false;
    }
    if (!isValidPassword(password.trim())) {
      setError('Contraseña inválida');
      return false;
    }
    if (!isValidPassword(confirmPassword.trim())) {
      setError('Contraseña inválida');
      return false;
    }
    setError('');
    return true;
  };

  return {
    fields,
    error,
    setError,
    handleInputChange,
    validateForm,
    validatePasswords,
  };
};
