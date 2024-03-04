import { toast } from "react-toastify"
import { create } from "zustand"
import axios from "axios"
import { API_URL } from "@/constants/API_URL"
import { uploadMultipleFiles, uploadSingleFile } from "@/utils/upload"
type AdminState = {
    isLoading: boolean,
    crousalImage: any[],
    allOffers: any[],
    allProducts: any[],
    allOrders: any[],
    allUsers: any[],
    allCategory: any[],
    allLocations: any[],
    test: any[],
    uploadedUrl: string,

    AddOffers: (data: any) => void,
    UpdateOffers: (data: any) => void,
    fetchAllUsers: () => void,
    fetchAllProducts: () => void,
    addProducts: (data: any) => void,
    updateProducts: (data: any, _id: any) => void,
    deleteProducts: (_id: any) => void,
    fetchAllOrders: () => void,
    fetchAllCategory: () => void,
    addCategory: (data: any) => void,
    updateCategory: (data: any, _id: any) => void,
    deleteCategory: (_id: any) => void,
    fetchAllLocation: () => void,
    addLocation: (data: any) => void,
    updateLocation: (data: any, _id: any) => void,
    deleteLocation: (_id: any) => void,
    uploadImage: (image: File) => void
}

export const useAdmin = create<AdminState>((set: any) => ({
    isLoading: false,
    crousalImage: [],
    allOffers: [],
    allProducts: [],
    allOrders: [],
    allUsers: [],
    allCategory: [],
    allLocations: [],
    test: [1],
    uploadedUrl: "",

    // offers
    fetchOffers: async () => {
        try {
            set({ isLoading: true })
            let res = await axios.get(`${API_URL}/home/offers`)
            if (res.data.status == "OK") {
                console.log("fetch offers ", res.data)
                set({
                    allOffers: res.data.data
                })
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },
    DeleteOffers: async (_id: string) => {
        try {
            console.log("dele ")
            set({ isLoading: true })
            let res = await axios.delete(`${API_URL}/home/offers/${_id}`)
            let prev = useAdmin.getState().allOffers;
            let newData = prev.filter((e: any) => e = e._id !== _id)
            set({
                allOffers: newData
            })
            toast.success("offer deleted succsfully")
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },
    AddOffers: async (data: any) => {
        try {
            set({ isLoading: true })
            if (data.image) {
                const image = await uploadSingleFile(data.image)
                data = { ...data, image }
            }
            let res = await axios.post(`${API_URL}/home/offers`, data)
            if (res.data.status == "OK") {
                console.log("res", res.data)
                let prev = useAdmin.getState().allOffers;
                set({
                    allOffers: [...prev, res.data.data]
                })
                toast.success("offer added succesfully")
            }
        } catch (error) {
            console.log("error ", error)
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },
    UpdateOffers: async (data: any) => {
        try {
            set({ isLoading: true })
            const prevData = useAdmin.getState().allOffers;
            const currentData = prevData.find((e: any) => e._id == data._id)
            if (data?.image) {
                const image = await uploadSingleFile(data.image)
                data = { ...data, image }
            } else {
                data = { ...data, image: currentData.image }
            }
            let res = await axios.put(`${API_URL}/home/offers/${data?._id}`, data)
            if (res.data.status == "OK") {
                console.log("res", res.data)
                let prev = useAdmin.getState().allOffers;
                let filterdData = prev.filter((e) => e = e._id != data._id)
                set({
                    allOffers: [...filterdData, data]
                })
                toast.success("offer added succesfully")
            }
        } catch (error) {
            console.log("error ", error)
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },

    // caroousal
    fetchcarousel: async () => {
        try {
            set({ isLoading: true })
            let res = await axios.get(`${API_URL}/home/carousel`)
            if (res.data.status == "OK") {
                set({
                    crousalImage: res.data.data
                })
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },
    Deletecarousel: async (_id: string) => {
        try {
            set({ isLoading: true })
            let res = await axios.delete(`${API_URL}/home/carousel/${_id}`)
            let prev = useAdmin.getState().crousalImage;
            let newData = prev.filter((e) => e = e._id !== _id)
            set({
                crousalImage: newData
            })
            toast.success("image deleted succsfully")
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },
    Addcarousel: async (data: any) => {
        try {
            if (data.image) {
                const image = await uploadSingleFile(data.image)
                data = { ...data, image }
            }
            set({ isLoading: true })
            let res = await axios.post(`${API_URL}/home/carousel`, data)
            if (res.data.status == "OK") {
                let prev = useAdmin.getState().crousalImage;
                set({
                    crousalImage: [...prev, res.data.data]
                })
                toast.success("image upload succesfully")
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },

    // manage users api
    fetchAllUsers: async () => {
        try {
            set({ isLoading: true })
            let res = await axios.get(`${API_URL}/users/all`)
            if (res.data.status == "OK") {
                set({
                    allUsers: res.data.data
                })
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },

    //manage Prodcuts api
    fetchAllProducts: async () => {
        try {
            set({ isLoading: true })
            let res = await axios.get(`${API_URL}/products/all`)
            console.log("res products ", res)
            if (res.data.status == "OK") {
                set({
                    allProducts: res.data.data
                })
            }
        } catch (error) {
            console.log("error in products : ", error)
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },
    addProducts: async (data: any) => {
        try {
            // const requiredFields = ["name", "price", "category", "images", "description", "stock", "deliveryLocations", "eanCode", "hsnCode", "multiPack", "howToUse", "gstRate", "size"]
            // if (!requiredFields.every(e => data[e])) {
            //     return toast.error(`
            //     Please fill all required fields
            //     Expected fields: ${requiredFields.join(", ")}
            //     Missing fields: ${requiredFields.filter(e => !data[e]).join(", ")}`
            //     )
            // }
            const images = await uploadMultipleFiles(data.images)
            console.log("images ", images)
            const dataToBeSent = { ...data, images }
            let res = await axios.post(`${API_URL}/products/create`, dataToBeSent)
            if (res.data.status == "OK") {
                let prevarr: any = useAdmin?.getState()?.allProducts
                set({
                    allProducts: [...prevarr, res.data.data]
                })
                toast.success("added successfully")
            }
        } catch (error) {
            console.log("error in add products : ", error)
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },
    updateProducts: async (data: any, _id: any) => {
        try {
            set({ isLoading: true })
            let res = await axios.patch(`${API_URL}/products/update/${_id}`, data)
            if (res.data.status == "OK") {
                let prevarr: any = useAdmin?.getState()?.allProducts;
                prevarr.forEach((e: any) => {
                    if (e._id == _id) {
                        e = { ...e, ...data };
                    }
                });
                set({
                    allProducts: prevarr
                })
                toast.success("updated successfully")
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },
    deleteProducts: async (_id: any) => {
        try {
            set({ isLoading: true })
            let res = await axios.delete(`${API_URL}/products/delete/${_id}`)
            if (res.data.status == "OK") {
                const prevarr: any = useAdmin?.getState()?.allProducts;
                const newArr = prevarr.filter((e: any) => {
                    return e = e._id != _id
                });
                set({
                    allProducts: newArr
                })
                toast.success("deleted successfully")
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },

    // manage orders api
    fetchAllOrders: async () => {
        try {
            set({ isOrderLoading: true })

        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isOrderLoading: false })
        }
    },

    // categories apis
    fetchAllCategory: async () => {
        try {
            set({ isLoading: true })
            let res = await axios.get(`${API_URL}/category/all`)
            if (res.data.status == "OK") {
                set({
                    allCategory: res.data.data
                })
            }
        } catch (error) {
            console.log("fetch categories error : ", error)
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },
    addCategory: async (data: any) => {
        try {
            const requiredFields = ["name", "icon"]
            if (!requiredFields.every(e => data[e])) {
                return toast.error(`
                Please fill all required fields
                Expected fields: ${requiredFields.join(", ")}
                `)
            }
            set({ isLoading: true })
            const icon = await uploadSingleFile(data.icon)
            const dataToBeSent = { ...data, icon }
            let res = await axios.post(`${API_URL}/category/create`, dataToBeSent)
            if (res.data.status == "OK") {
                let prevarr: any = useAdmin?.getState()?.allCategory
                set({
                    allCategory: [...prevarr, res.data.data]
                })
                toast.success("Added successfully")
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },
    updateCategory: async (data: any, _id: any) => {
        try {
            set({ isLoading: true })
            if (data.icon) {
                const icon = await uploadSingleFile(data.icon)
                data = { ...data, icon }
            } else {
                data = { ...data, icon: useAdmin.getState().allCategory.find((e: any) => e._id == _id).icon }
            }
            let res = await axios.patch(`${API_URL}/category/update/${_id}`, data)
            if (res.data.status == "OK") {
                let prevarr: any = useAdmin?.getState()?.allCategory;
                prevarr.forEach((e: any) => {
                    if (e._id == _id) {
                        e.name = data.name;
                    }
                });
                await useAdmin.getState().fetchAllCategory()
                toast.success("updated successfully")
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },
    deleteCategory: async (_id: any) => {
        try {
            set({ isLoading: true })
            let res = await axios.delete(`${API_URL}/category/delete/${_id}`)
            if (res.data.status == "OK") {
                let prevarr: any = useAdmin?.getState()?.allCategory;
                let newArr = prevarr.filter((e: any) => {
                    return e = e._id != _id
                });
                set({
                    allCategory: newArr
                })
                toast.success("deleted successfully")
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },
    fetchAllLocation: async () => {
        try {
            set({ isLoading: true })
            let res = await axios.get(`${API_URL}/delivery/all`)
            if (res.data.status == "OK") {
                set({
                    allLocations: res.data.data
                })
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },
    addLocation: async (data: any) => {
        try {
            const requiredFields = ["name", "location", "pincode"]
            if (!requiredFields.every(e => data[e])) {
                return toast.error(`
                Please fill all required fields
                Expected fields: ${requiredFields.join(", ")}
                Missing fields: ${requiredFields.filter(e => !data[e]).join(", ")}`
                )
            }
            set({ isLoading: true })
            let res = await axios.post(`${API_URL}/delivery/create`, data)
            if (res.data.status == "OK") {
                let prevarr: any = useAdmin?.getState()?.allLocations
                set({
                    allLocations: [...prevarr, res.data.data]
                })
                toast.success("added successfully")
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },
    updateLocation: async (data: any, _id: any) => {
        try {
            set({ isLoading: true })
            let res = await axios.patch(`${API_URL}/delivery/update/${_id}`, data)
            if (res.data.status == "OK") {
                let prevarr: any = useAdmin?.getState()?.allLocations;
                prevarr.forEach((e: any) => {
                    if (e._id == _id) {
                        e.name = data.name;
                        e.location = data.location;
                        e.deliveryCharge = data.deliveryCharge;
                        e.pincode = data.pincode;
                    }
                });
                set({
                    allLocations: prevarr
                })
                toast.success("updated successfully")
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },
    deleteLocation: async (_id: any) => {
        try {
            set({ isLoading: true })
            let res = await axios.delete(`${API_URL}/delivery/delete/${_id}`)
            if (res.data.status == "OK") {
                let prevarr: any = useAdmin?.getState()?.allLocations;
                let newArr = prevarr.filter((e: any) => {
                    return e = e._id != _id
                });
                set({
                    allLocations: newArr
                })
                toast.success("deleted successfully")
            }
        } catch (error) {
            toast.error("server issue")
        }
        finally {
            set({ isLoading: false })
        }
    },
    uploadImage: async (image: File) => {
        try {
            set({ isLoading: true })
            let formData = new FormData();
            formData.append("image", image)
            let res = await axios.post(`${API_URL}/upload/single`, formData)
            if (res.data.status == "OK") {
                toast.success("uploaded successfully")
                set({ isLoading: false, uploadedUrl: res.data.data })
                return res.data.data
            }
        } catch (error) {
            toast.error("server issue")
            set({ isLoading: false })
        }
    }
}))