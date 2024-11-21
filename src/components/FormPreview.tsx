import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Text from './form-type/Text';
import Textarea from './form-type/TextArea';
import Select from './form-type/Select';
import RadioGroup from './form-type/RadioGroup';
import toast from 'react-hot-toast';

function FormPreview({ schema }: { schema: any }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const notify = () => toast.success('Form submitted and downloaded successfully!');
    const onSubmit: SubmitHandler<any> = (data) => {
        console.log("Submitted Data:", data);
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "form-submission.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      
        notify();
      };

    const renderField = (field: any) => {
        const validationRules = {
            required: field.required ? `${field.label} is required.` : false,
            ...field.validationRules,
        };
    
        switch (field.type) {
            case 'text':
            case 'email':
                return (
                    <Text
                        key={field.id}
                        field={field}
                        register={register}
                        validationRules={validationRules}
                        error={errors[field.id]?.message as string}
                    />
                );
            case 'textarea':
                return (
                    <Textarea
                        key={field.id}
                        field={field}
                        register={register}
                        validationRules={validationRules}
                        error={errors[field.id]?.message as string}
                    />
                );
            case 'select':
                return (
                    <Select
                        key={field.id}
                        field={field}
                        register={register}
                        validationRules={validationRules}
                        error={errors[field.id]?.message as string}
                    />
                );
            case 'radio':
                return (
                    <RadioGroup
                        key={field.id}
                        field={field}
                        register={register}
                        validationRules={validationRules}
                        error={errors[field.id]?.message as string}
                    />
                );
            default:
                return null;
        }
    };
    

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h1 className="text-xl font-bold">{schema?.formTitle || 'Form Title'}</h1>
            <p>{schema?.formDescription}</p>
            {schema?.fields?.map(renderField)}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit
            </button>
        </form>
    );
}

export default FormPreview;
