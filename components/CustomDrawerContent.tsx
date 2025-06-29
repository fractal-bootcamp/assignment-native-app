import { TText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { authClient } from '@/lib/auth-client';
import { useTRPC } from '@/lib/trpc/trpc';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

export default function CustomDrawerContent(props: any) {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: session, isPending: sessionLoading } = authClient.useSession();
    const trpc = useTRPC();
    const { data: recipeData, isLoading: recipeLoading, error: recipeError } = useQuery(trpc.recipes.list.queryOptions());

    console.log("re-rendering drawer!")

    useEffect(() => {
        if (recipeError) {
            console.error(recipeError);
        } else {
            console.log(recipeData);
        }
    }, [recipeError, recipeData]);

    const logoutButton = (
        <TouchableOpacity onPress={() => {
            authClient.signOut();
            queryClient.invalidateQueries({ queryKey: trpc.recipes.list.queryKey() });
            router.push('/signin');
        }}>
            <TText className="text-sm opacity-70">
                Logout
            </TText>
        </TouchableOpacity>
    )
    const loginButton = (
        <Link href="/signin" asChild>
            <TouchableOpacity>
                <TText>Sign In</TText>
            </TouchableOpacity>
        </Link>
    )
    function loginOrLogoutButton() {
        if (sessionLoading) {
            return (<View></View>)
        } else {
            return (session ? logoutButton : loginButton)
        }
    }

    return (
        <DrawerContentScrollView {...props}
            style={{ backgroundColor: '#f5efe9' }}
            contentContainerStyle={{ paddingStart: 0, paddingEnd: 0, paddingTop: 0, paddingBottom: 0, marginTop: 0 }}>
            <View className="p-5 pt-20 border-[#e8d5c4] bg-[#e8d5c4] flex flex-row justify-between">
                <TText className="text-2xl flex-[2] font-[PlayfairDisplay-Bold]">
                    Little Chef
                </TText>
                {loginOrLogoutButton()}
            </View>

            <View className="p-5 border-[#e8d5c4] bg-[#f5efe9]">
                <View className="flex flex-row justify-between items-center">
                    <TText className='text-lg font-[PlayfairDisplay-SemiBold]'>Saved Recipes</TText>
                    <Link href="/" asChild>
                        <TouchableOpacity className='bg-blue-500 rounded-full w-10 h-10 items-center justify-center'>
                            <TText className='text-xl font-[PlayfairDisplay-Bold] text-white'>+</TText>
                        </TouchableOpacity>
                    </Link>
                </View>
                {session && !session.user && <Link href="/signin" asChild>
                    <TouchableOpacity>
                        <TText>Sign In</TText>
                    </TouchableOpacity>
                </Link>}

                <ScrollView className="max-h-75">
                    {(recipeData?.recipes ?? []).map((recipe) => (
                        <TouchableOpacity
                            key={recipe.id}
                            className={`py-3 border-b border-gray-300`}
                            onPress={() => {
                                router.push(`/recipe/${recipe.id}`);
                            }}
                        >
                            <TText type="defaultSemiBold" className="text-base font-medium mb-0.5">{recipe.name}</TText>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View className="h-px my-2.5 border-[#e8d5c4] bg-[#f5efe9]" />
        </ DrawerContentScrollView>
    );
} 