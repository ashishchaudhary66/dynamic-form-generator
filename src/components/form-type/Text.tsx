import React from 'react';
import { FieldProps } from '../interfaces/FieldProps';

const Text: React.FC<FieldProps> = ({ field, register, validationRules, error }) => (
    <div className="space-y-2">
        <label htmlFor={field.id} className="block font-medium">
            {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={field.type || 'text'}
            id={field.id}
            placeholder={field.placeholder}
            {...register(field.id, validationRules)}
            className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);
  export default Text;