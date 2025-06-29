import { TText } from '@/components/ThemedText';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

interface TimerProps {
    minutes: number;
    instructionIndex: number;
}

export function Timer({ minutes, instructionIndex }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(minutes * 60); // Convert to seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        setIsRunning(false);
                        setIsCompleted(true);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStart = () => {
        setIsRunning(true);
        setIsCompleted(false);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setTimeLeft(minutes * 60);
        setIsRunning(false);
        setIsCompleted(false);
    };

    const getButtonColor = () => {
        if (isCompleted) return 'bg-emerald-500'; // Green
        if (isRunning) return 'bg-yellow-500'; // Yellow
        return 'bg-blue-500'; // Blue
    };

    const getButtonText = () => {
        if (isCompleted) return '✓ Done';
        if (isRunning) return '⏸ Pause';
        return '▶ Start';
    };

    return (
        <View className="mt-2 p-3 rounded-lg border border-[#e8d5c4] bg-[#f8f9fa]">
            <View className="items-center mb-2">
                <TText type="title" className="text-2xl font-bold text-[#2c3e50]">{formatTime(timeLeft)}</TText>
                <TText className="text-xs text-[#6c757d] mt-0.5 font-sans">Timer</TText>
            </View>

            <View className="flex-row space-x-2">
                {!isCompleted && (
                    <TouchableOpacity
                        className={`flex-1 py-2 px-3 rounded-md items-center ${getButtonColor()}`}
                        onPress={isRunning ? handlePause : handleStart}
                    >
                        <TText type="defaultSemiBold" className="text-white text-sm font-semibold">{getButtonText()}</TText>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    className="flex-1 py-2 px-3 rounded-md items-center bg-[#6c757d]"
                    onPress={handleReset}
                >
                    <TText type="defaultSemiBold" className="text-white text-sm font-semibold">Reset</TText>
                </TouchableOpacity>
            </View>
        </View>
    );
} 