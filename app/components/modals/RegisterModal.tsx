'use client'

import axios from 'axios'
import { AiFillGithub } from 'react-icons/Ai'
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import { toast } from 'react-hot-toast';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import { signIn } from 'next-auth/react';

type RegisterFieldType = {
    id: string,
    name: string,
    type?: string
}

const RegisterFields: RegisterFieldType[] = [
    {
        id: `name`,
        name: `Name`
    },
    {
        id: `email`,
        name: `Email`,
    },
    {
        id: `password`,
        name: `Password`,
        type: `password`
    }
]

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsloading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: ``,
            email: ``,
            password: ``
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true)

        axios.post(`/api/register`, data)
            .then(() => {
                registerModal.onClose()
            })
            .catch((error) => {
                toast.error(`Error during registration.`)
            })
            .finally(() => {
                setIsloading(false)
            })

    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title={`Welcome to Airbnb`} subtitle={`Create an account!`} center />
            {RegisterFields.map((field: RegisterFieldType) =>
                <Input
                    key={field.id}
                    id={field.id}
                    label={field.name}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    type={field.type ? field.type : `text`} />)}
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn(`google`)} />
            <Button
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => signIn(`github`)} />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div
                        className='text-neutral-800 cursor-pointer hover:underline'
                        onClick={toggle}>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )


    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent} />
    )
}

export default RegisterModal