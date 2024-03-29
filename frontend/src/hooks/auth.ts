import { useMutation } from '@tanstack/react-query';

const adminSignUp = async (payload: {
    name: string;
    email: string;
    password: string;
}) => {
    // TODO: refactor into env variables.
    const res = await fetch('http://localhost:8000/auth/admin/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error('Failed on sign up request');
    }
};

const volunteerSignUp = async (payload: { email: string }) => {
    const res = await fetch('http://localhost:8000/auth/volunteer/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error('Failed on sign up request');
    }
};

const adminLogin = async (payload: { email: string; password: string }) => {
    const res = await fetch('http://localhost:8000/auth/volunteer/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error('Failed on login request');
    }
};

const requestOTP = async (payload: { email: string }) => {
    const res = await fetch('http://localhost:8000/auth/otp/request-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error('Failed on OTP request');
    }
};

export const useAdminSignUp = () => {
    const { mutate, isSuccess, isError } = useMutation({
        mutationFn: (payload: {
            name: string;
            email: string;
            password: string;
        }) => adminSignUp(payload),
    });

    return {
        adminSignUp: mutate,
        adminSignUpSuccess: isSuccess,
        adminSignUpError: isError,
    };
};

export const useVolunteerSignUp = () => {
    const { mutate } = useMutation({
        mutationFn: (payload: { email: string }) => volunteerSignUp(payload),
    });

    return mutate;
};

export const useAdminLogin = () => {
    const { mutate, isSuccess, isError } = useMutation({
        mutationFn: (payload: { email: string; password: string }) =>
            adminLogin(payload),
    });

    return {
        adminLogin: mutate,
        adminLoginSuccess: isSuccess,
        adminLoginError: isError,
    };
};

export const useRequestOTP = () => {
    const { mutate, isSuccess, isError } = useMutation({
        mutationFn: (payload: { email: string }) => requestOTP(payload),
    });

    return {
        requestOTP: mutate,
        requestOTPSuccess: isSuccess,
        requestOTPError: isError,
    };
};
