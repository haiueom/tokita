'use client';

import { TrashIcon } from "@heroicons/react/24/solid";
import { Button, Card, Title, Text } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';
import toast from "react-hot-toast";

export default function DeleteBtn({ id }: { id: string }) {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    async function handleDelete() {
        try {
            setIsOpen(false);
            setLoading(true);
            const res = await fetch(`/api/product/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                toast.success('Product deleted');
                router.push('/admin/product');
            } else {
                throw new Error('Failed to delete product');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Button
                icon={TrashIcon}
                size="xs"
                color="red"
                onClick={() => setIsOpen(true)}
                loading={loading}
            >
                Delete
            </Button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-30" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden transition-all">
                                    <Card>
                                        <Title>Delete this product?</Title>
                                        <Text className="mt-2">This action cannot be undone.</Text>
                                        <div className="mt-4">
                                            <Button
                                                onClick={() => handleDelete()}
                                                className="mr-2"
                                                size="sm"
                                                color="red"
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                onClick={() => setIsOpen(false)}
                                                size="sm"
                                                variant="secondary"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </Card>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
