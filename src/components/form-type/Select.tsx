import React from 'react';
import { FieldProps } from '../interfaces/FieldProps';
const Select: React.FC<FieldProps> = ({ field, register, validationRules, error }) => (
    <div className="space-y-2">
        <label htmlFor={field.id} className="block font-medium">
            {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        <select
            id={field.id}
            {...register(field.id, validationRules)}
            className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
        >
            <option value="">Select...</option>
            {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);
  export default Select;