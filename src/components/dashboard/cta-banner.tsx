
'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface CtaBannerProps {
    title: React.ReactNode;
    description: string;
    children?: React.ReactNode;
    imageUrl?: string;
}

export function CtaBanner({ title, description, children, imageUrl }: CtaBannerProps) {
    const bannerStyle = {
        backgroundImage: `url(${imageUrl || 'https://placehold.co/1200x200.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card 
                className="relative overflow-hidden p-8 md:p-12 text-primary-foreground"
                style={bannerStyle}
                data-ai-hint="abstract pattern"
            >
                <div className="absolute inset-0 bg-primary/90" />
                <div className="relative z-10 flex flex-col items-center text-center md:flex-row md:text-left md:items-center justify-between gap-6">
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold font-headline">{title}</h2>
                        <p className="max-w-2xl text-primary-foreground/80">{description}</p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
                        {children}
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
