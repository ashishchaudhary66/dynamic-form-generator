import React from 'react';
import { FieldProps } from '../interfaces/FieldProps';

const RadioGroup: React.FC<FieldProps> = ({ field, register, validationRules, error }) => (
    <div className="space-y-2">
        <p className="font-medium">
            {field.label} {field.required && <span className="text-red-500">*</span>}
        </p>
        <div className="flex flex-col md:gap-4 md:flex-row ">
            {field.options?.map((option) => (
                <label key={option.value} className="inline-flex items-center space-x-2">
                    <input
                        type="radio"
                        value={option.value}
                        {...register(field.id, validationRules)}
                        className="form-radio"
                    />
                    <span>{option.label}</span>
                </label>
            ))}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);

export default RadioGroup;
