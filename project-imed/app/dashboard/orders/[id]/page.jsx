"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import api from "@/http";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductDetailsPage = () => {
    const [initialValues, setInitialValues] = useState([]);
    const [orderStatus, setOrderStatus] = useState("Pending");
    const { id } = useParams();
    console.log("id::", id);

    const getOrderDetail = () => {
        api.get(`/order/${id}`)
            .then(({ data }) => {
                console.log("data::", data);
                setInitialValues(data.result.data);
                setOrderStatus(data.result.data.orderStatus);
            })

    }
    useEffect(() => {
        getOrderDetail()
    }, [])
    const updateOrder = () => {
        api.put(`/order/${id}`, { orderStatus })
            .then(({ data }) => {
                getOrderDetail();
            })
    }
    if (!initialValues) {
        return (
            <div className="mx-auto max-w-270">
                <Breadcrumb pageName="Not found" />
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-3 xl:col-span-3">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <h3 className="font-medium text-black dark:text-white">
                                Order Information
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    console.log("initialValues::", initialValues);
    return (
        <div className="mx-auto max-w-270">
            <Breadcrumb pageName="Product Details" />
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-3 xl:col-span-3">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark flex justify-between items-center">
                            <div>
                                <h3 className="font-medium text-black dark:text-white">
                                    Order Information
                                </h3>
                            </div>
                            <div>
                                {/* <Link href={`/dashboard/inventory/products/add?id=${product}`}
                                    className="inline-flex items-center justify-center gap-1 rounded-full bg-opacity-50 text-white bg-primary py-1.5 px-4 text-center font-medium hover:bg-opacity-90 lg:px-8 xl:px-4 hover:text-white"
                                >
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3l1.587 1.585l-1.59 1.584l-1.586-1.585l1.589-1.584zM6 16v-1.585l7.04-7.018l1.586 1.586L7.587 16H6zm-2 4h16v2H4z" /></svg>
                                    </span>
                                    Edit
                                </Link> */}
                            </div>
                        </div>
                        <div className="p-3 font-medium text-black dark:text-white">
                            <table className="w-full text-left text-gray-500 dark:text-gray-400">
                                <thead className="font-medium  text-gray-700 uppercase dark:text-gray-400 px-4">
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th scope="col" className="px-6 bg-gray-50 dark:bg-gray-800">
                                            Field
                                        </th>
                                        <th scope="col" className="px-6">
                                            Value
                                        </th>
                                    </tr>
                                </thead>
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <tbody className="text-xs">
                                        {Object.entries(initialValues).map(([key, value]) => (
                                            <tr className="border-b border-gray-200 dark:border-gray-700" key={key}>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">{key}</th>
                                                <td className="px-6 py-4">{JSON.stringify(value)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </table>
                        </div>
                        <div className="p-8">
                            <h3 className="font-medium text-xl text-black dark:text-white">
                                Updata Order States
                            </h3>
                            <select
                                value={orderStatus}
                                className=" mt-4 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                onChange={e => setOrderStatus(e.target.value)}
                            >
                                <option >
                                    select status
                                </option>
                                <option value={'Pending'}>
                                    Pending
                                </option>
                                <option value={'Processing'}>
                                    Processing
                                </option>
                                <option value={'Out for Shipping'}>
                                    Out for Shipping
                                </option>
                                <option value={'Shipped'} >
                                    Shipped
                                </option>
                            </select>
                            <button
                                className="flex mt-4 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"

                                onClick={updateOrder}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductDetailsPage;