import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Col, Form, Input, Label, Modal, Row, FormFeedback, Button, ModalBody, FormGroup, ModalHeader} from 'reactstrap';
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {filterDepartmentUnits, updateDepartmentUnit} from "../../../slices/definitions/department-units/thunk";
import {useAuth} from "../../Hooks/UserHooks";
import {filterDepartments} from "../../../slices/definitions/departments/thunk";

const DepartmentUnitUpdateModal = ({isOpen, item, onToggle, onSuccess, onError}) => {

    const dispatch = useDispatch();

    const departmentUnitState = useSelector(
        createSelector(
            (state) => state.DepartmentUnit,
            (state) => ({
                loading: state.loading,
                success: state.success,
            })
        ));
    const departmentState = useSelector(
        createSelector(
            (state) => state.Department,
            (state) => ({
                items: state.items,
            })
        ));

    const {isAuthenticated} = useAuth();
    useEffect(() => {

        if (isOpen && isAuthenticated) {
            validation.resetForm();
            dispatch(filterDepartments({search: ""}))
        }
    }, [isOpen,isAuthenticated])
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            id: item?.id || "",
            title: item?.title || "",
            departmentId: item?.department.id || "",
            uniqueNumber: item?.uniqueNumber || null,
        }, validationSchema: Yup.object({
            id: Yup.string().required("شناسه اجباری میباشد"),
            title: Yup.string().required("عنوان اجباری میباشد"),
            departmentId: Yup.string().required("دپارتمان اجباری میباشد"),
        }), onSubmit: async (values) => {
            const result = await dispatch(updateDepartmentUnit(values));
            if (result) {
                onSuccess(result)
            } else {
                onError();
            }
        },
    });

    document.title = "Validation | Velzon - React Admin & Dashboard Template";

    return (<React.Fragment>
        <Modal isOpen={isOpen} backdrop={true} toggle={onToggle}>
            <ModalHeader>ویرایش بخش</ModalHeader>
            <ModalBody>
                <Form
                    className="needs-validation"
                    onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}
                >
                    <Row>
                        <Input
                            disabled
                            name="id"
                            type="hidden"
                            id="id"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.id || ""}
                            invalid={!!(validation.touched.id && validation.errors.id)}
                        />

                        <Col md={12}>
                            <FormGroup className="mb-3">
                                <Label htmlFor="validationCustom01">عنوان</Label>
                                <Input

                                    name="title"
                                    placeholder=""
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.title || ""}
                                    invalid={!!(validation.touched.title && validation.errors.title)}
                                />
                                {
                                    validation.touched.title && validation.errors.title ? (
                                        <FormFeedback type="invalid">
                                            {validation.errors.title}
                                        </FormFeedback>) : null
                                }
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup className="mb-3">
                                <Label htmlFor="validationCustom01">شناسه یکتا</Label>
                                <Input
                                    name="uniqueNumber"
                                    placeholder=""
                                    type="number"
                                    className="form-control"
                                    id="uniqueNumber"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.uniqueNumber || ""}
                                    invalid={!!(validation.touched.uniqueNumber && validation.errors.uniqueNumber)}
                                />
                                {validation.touched.uniqueNumber && validation.errors.uniqueNumber ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.uniqueNumber}
                                    </FormFeedback>) : null}
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup className="mb-3">
                                <Label htmlFor="validationCustom01">دپارتمان</Label>
                                <select
                                    className="form-select mb-3"
                                    aria-label="Default select example"
                                    name="departmentId"
                                    placeholder=""
                                    id="departmentId"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.departmentId || ""}

                                >
                                    {departmentState.items.map(i => {
                                        return <option key={i.id} value={i.id}>{i.title}</option>
                                    })}

                                </select>
                                {validation.touched.departmentId && validation.errors.departmentId ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.departmentId}
                                    </FormFeedback>) : null}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button disabled={departmentState.loading} color="success" type="submit">
                                ذخیره
                            </Button>
                            <Button onClick={onToggle} color="primary" type="button" className={"ms-2"}>
                                انصراف
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
        </Modal>
    </React.Fragment>);
};

export default DepartmentUnitUpdateModal;