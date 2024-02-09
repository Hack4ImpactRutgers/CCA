import { FC } from 'react';
import Dashboard from './Dashboard';

interface PageProps {}

const Page: FC<PageProps> = () => {
    return (
        <main>
            <Dashboard />
        </main>
    )
};

export default Page;
