import { useState, ChangeEvent, FormEvent, useRef, useEffect, useCallback } from "react";
import { AddTaskProps } from "../../types/types";
import Input from "../ui/Input";
import Button from "../ui/Button";
import styles from './AddTask.module.scss';


function AddTask({ formSubmit, setFormVisible }: AddTaskProps) {
    const [formValues, setFormValues] = useState({ title: '' });
    const [placeholder, setPlaceholder] = useState('');
    const formRef = useRef<HTMLFormElement>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formValues.title.trim()) {
            formSubmit(formValues.title);
            setFormValues({ title: '' }); 
            setFormVisible(false);
        } else {
            setPlaceholder('Title cannot be empty');
        }
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(event.target as Node)) {
            setFormVisible(false);
        }
    }, [setFormVisible]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <form ref={formRef} onSubmit={handleFormSubmit} className={styles.form}>
            <div className={styles.form__input}>
                <Input
                value={formValues.title}
                onChange={handleInputChange}
                type="text"
                id="taskTitle"
                name="title"
                placeholder={placeholder}
                className={styles.form__input__area}
                />
            </div>
            
            <Button
                name="Submit"
                className={styles.form__button}
                buttonType="submit"
            />
        </form>
    );
}

export default AddTask;