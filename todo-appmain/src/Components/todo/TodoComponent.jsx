import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { Form, Field, Formik, ErrorMessage } from "formik";
export default function TodoComponent() {

    const { id } = useParams()

    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')

    const authContext = useAuth()
    const username = authContext.username
 
    const navigate = useNavigate()

    useEffect(() => retrieveTodos(), [id])

    function retrieveTodos() {
        if(id!=-1){
        retrieveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error));
        }

    }
    function onSubmit(values) {
        console.log(values)
        const todo ={
            id : id,
            username : username,
            description : values.description,
            targetDate: values.targetDate,
            done: false
        }
        console.log(todo)
        if(id!= -1){
        updateTodoApi(username,id,todo)
        .then(response=>{navigate('/todos')})
        .catch(error => console.log(error));
        }
        else{
            createTodoApi(username,todo)
            .then(response=>{console.log(response);navigate('/todos')})
            .catch(error => console.log(error));
        }
       
    }
    function validate(values) {
        let errors = { 
                    //   description: 'Enter a valid descrpition' ,
                    //   targetDate :'Enter a valid date'
                    }
                    if (values.description.length < 5){
                        errors.description = 'Enter atleast 5 characters'
                    }
                    if (values.targetDate ==null || values.targetDate =='' ){
                        errors.description = 'Enter a target date'
                    }
        console.log(values)
        return errors
    }
    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                {/* description:{description} */}
                <Formik initialValues={{ description, targetDate }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}>
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage
                                name="description"
                                component="div"                                
                                className="alert alert-warning"
                                />
                                <ErrorMessage
                                name="targetDate"
                                component="div"                                
                                className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>TargetDate</label>
                                    <Field type="date" className="form-control" name="targetDate" />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}