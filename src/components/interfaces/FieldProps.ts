import { UseFormRegister } from 'react-hook-form';

export interface FieldProps {
  field: {
    id: string;
    label: string;
    required?: boolean;
    placeholder?: string;
    type?: string; 
    options?: { value: string; label: string }[];
  };
  register: UseFormRegister<any>;
  validationRules: any;
  error?: string;
}
