"use client"

import React,{useEffect,useState} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { useSearchParams } from 'next/navigation';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Product Name is required'),
  type: Yup.string().required('Item Type is required'),
  category: Yup.string().required('Category is required'),
  codeName: Yup.string().required('Item Code is required'),
  status: Yup.string().required('Status is required'),
  form: Yup.string().required('Form is required'), 
  dispanseForm: Yup.string().required('Dispensed Form is required'),
  strength: Yup.string().required('Strength is required'),
  prefQtyOne: Yup.string().required('Preferred Quantity 1 is required'),  
  prefQtyTwo: Yup.string().required('Preferred Quantity 2 is required'),  
  prefQtyThree: Yup.string().required('Preferred Quantity 3 is required'), 
  repeatConsult: Yup.string().required('Repeat Consultation is required'),  
  yearLimit: Yup.number().typeError('Limit per Year must be a number').integer('Limit per Year must be an integer').positive('Limit per Year must be positive').required('Limit per Year is required'),  
  buildCostPrUnit : Yup.number().typeError('Manufacturing Price per Unit must be a number').positive('Manufacturing Price per Unit must be positive').required('Manufacturing Price per Unit is required'),  
  fixedQty: Yup.number().typeError('Qty per Month Supply must be a number').integer('Qty per Month Supply must be an integer').positive('Qty per Month Supply must be positive').required('Qty per Month Supply is required'),  
  retailPrice: Yup.number().typeError('Retail Price must be a number').positive('Retail Price must be positive').required('Retail Price is required'),  
});

function ErrMessage({ name }:any) {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => (
        <div className="text-red-500 text-sm">{msg}</div>
      )}
    />
  );
}

function AddProductForm() {

  const [itemTypes, setItemTypes ] = useState([]);
  const [formOptions, setFormOptions ] = useState([]);
  const [categories,setCategories] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: '',
    type: null,
    category: null,
    codeName: '',
    status: true,
    form: null,  
    dispanseForm: null,  
    strength: '',
    prefQtyOne: '', 
    prefQtyTwo: '',  
    prefQtyThree: '', 
    repeatConsult: 'no',  
    yearLimit: '',  
    buildCostPrUnit
: '',  
fixedQty: '',  
    retailPrice: '',  
  });
  const params = useSearchParams();
  const paramsId = params.get("id")
  
  const onSubmit = (values:any, { resetForm }:any ) => {
    // Handle the form submission here    
    if(paramsId){
      values.id = paramsId;
      axios.put('/api/inventory', values)
        .then(({ data }) => {
          console.log("data::",data);
            toast.success(data.result.message);
            resetForm(); // Reset the form after successful submission
        })
        .catch((error) => {
          console.error(error);
          toast.error('There was an error. Please try again');
        });
    }else{
      values.totalCount = 10,
      values.fixedQty = "90";
      axios.post('/api/inventory', values)
        .then(({ data }) => {
          console.log(data);
            toast.success(data.result.message);
            resetForm(); // Reset the form after successful submission
        })
        .catch((error) => {
          console.error(error);
          toast.error('There was an error. Please try again');
        });
    }

  };

  // Mock data for item types and categories (you can fetch this data from an API)

  // const categories = [
  //   { value: 'category1', label: 'Category 1' },
  //   { value: 'category2', label: 'Category 2' },
  //   // Add more categories as needed
  // ];

  // const formOptions = [
  //   { value: 'SYRUP', label: 'SYRUP' },
  //   { value: 'PLASTER', label: 'PLASTER' },
  //   // Add more form options as needed
  // ];

  useEffect(() => {
    if (paramsId) {
      axios.get(`/api/inventory/${paramsId}`)
        .then(({ data }) => {
          console.log("data.result.data.prefOtyOne.qty",data.result.data.prefQtyOne);
          
          let productItem = {...data.result.data,
            prefQtyOne: data.result.data.prefQtyOne.qty,
            prefQtyThree: data.result.data.prefQtyThree.qty,
            prefQtyTwo: data.result.data.prefQtyTwo.qty,
            category : data.result.data.category[0].name
          }
          setInitialValues(productItem)

        }).catch((err) => {
          console.log("error:::",err);
          
          // toast.error(error.message);
        })
    }
    
    axios.get(`/api/types/itemTypes`)
    .then(({ data }) => {
     let items = data.result.data.map((item:any)=>(
      {value : item, label : item}
     ))
     setItemTypes(items)
    })
    
    axios.get(`/api/types/formTypes`)
    .then(({ data }) => {
     let items = data.result.data.map((item:any)=>(
      {value : item, label : item}
     ))
     setFormOptions(items)
    })

    axios.get(`/api/categories`)
    .then(({ data }) => {
     let items = data.result.data.map((item:any)=>(
      {value : item.name, label : item.name}
     ))
     setCategories(items)
    })
},[paramsId])
  
  // const dispensedFormOptions = [
  //   { value: 'box', label: 'Box' },
  //   { value: 'bottle', label: 'Bottle' },
  //   // Add more dispensed form options as needed
  // ];
  

  return (
    <div className="min-h-screen bg-gray-200 flex ">
      <div className="bg-white w-full h-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add Product</h1>
          <Link href="/dashboard/inventory/products">
            <button className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
              Product List
            </button>
          </Link>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          <Form>
            <div className="mb-4">
              <label className="block text-gray-600">Product Name</label>
              <Field
                type="text"
                name="name"
                className="border rounded w-full px-3 py-2 mt-1"
                placeholder="Enter Product Name"
              />
              <ErrMessage name="name" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Item Type</label>
              <Field
                name="type"
                component={SelectField} // Custom component for react-select
                options={itemTypes}
              />
              <ErrMessage name="type" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Category</label>
              <Field
                name="category"
                component={SelectField} // Custom component for react-select
                options={categories}
              />
              <ErrMessage name="category" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Item Code</label>
              <Field
                type="text"
                name="codeName"
                className="border rounded w-full px-3 py-2 mt-1"
                placeholder="Enter Item Code"
              />
              <ErrMessage name="codeName" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Status</label>
              <Field
                name="isActive"
                as="select"
                className="border rounded w-full px-3 py-2 mt-1"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Field>
              <ErrMessage name="status" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Form</label>
              <Field
                name="form"
                component={SelectField}
                options={formOptions}
              />
              <ErrMessage name="form" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Dispensed Form</label>
              <Field
                name="dispanseForm"
                component={SelectField}
                options={formOptions}
              />
              <ErrMessage name="dispanseForm" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Strength</label>
              <Field
                type="text"
                name="strength"
                className="border rounded w-full px-3 py-2 mt-1"
                placeholder="Enter Strength"
              />
              <ErrMessage name="strength" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Preferred Quantity 1</label>
              <Field
                type="text"
                name="prefQtyOne"
                className="border rounded w-full px-3 py-2 mt-1"
                placeholder="Enter Preferred Quantity 1"
              />
              <ErrMessage name="prefQtyOne" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Preferred Quantity 2</label>
              <Field
                type="text"
                name="prefQtyTwo"
                className="border rounded w-full px-3 py-2 mt-1"
                placeholder="Enter Preferred Quantity 2"
              />
              <ErrMessage name="prefQtyTwo" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Preferred Quantity 3</label>
              <Field
                type="text"
                name="prefQtyThree"
                className="border rounded w-full px-3 py-2 mt-1"
                placeholder="Enter Preferred Quantity 3"
              />
              <ErrMessage name="prefQtyThree" />
            </div>

            <div className="mb-4">
                <label className="block text-gray-600">Repeat Consultation Within 1 Year</label>
                <Field
                  as="select"
                  name="repeatConsult"
                  className="border rounded w-full px-3 py-2 mt-1"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Field>
                <ErrMessage name="repeatConsult" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600">Limit per Year</label>
                <Field
                  type="number"
                  name="yearLimit"
                  className="border rounded w-full px-3 py-2 mt-1"
                  placeholder="Enter Limit per Year"
                />
                <ErrMessage name="yearLimit" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600">Manufacturing Price per Unit</label>
                <Field
                  type="number"
                  name="buildCostPrUnit"
                  className="border rounded w-full px-3 py-2 mt-1"
                  placeholder="Enter Manufacturing Price per Unit"
                />
                <ErrMessage name="buildCostPrUnit" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600">Qty per Month Supply</label>
                <Field
                  type="number"
                  name="fixedQty"
                  className="border rounded w-full px-3 py-2 mt-1"
                  placeholder="Enter Qty per Month Supply"
                />
                <ErrMessage name="fixedQty" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600">Retail Price</label>
                <Field
                  type="number"
                  name="retailPrice"
                  className="border rounded w-full px-3 py-2 mt-1"
                  placeholder="Enter Retail Price"
                />
                <ErrMessage name="retailPrice" />
              </div>
          
                <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {paramsId ? "Update" : "Save"}
            </button>
         
          </Form>
        </Formik>
      </div>
    </div>
  );
}

// Custom component for react-select

const SelectField = ({ field, form, options }:any) => (
  <Select
    {...field}
    options={options}
    onChange={(selectedOption:any) => {
      form.setFieldValue(field.name, selectedOption ? selectedOption : ''); // Extract the value property or set an empty string if nothing is selected
      form.setFieldTouched(field.name, true);
    }}
    onBlur={() => {
      // Trigger onBlur only when the user clicks on the Select component
      form.setFieldTouched(field.name, true);
    }}
    value={options.find((option:any) => option.value === field.value)} // Set the value prop to the corresponding field value
    isClearable
  />
);




export default AddProductForm;