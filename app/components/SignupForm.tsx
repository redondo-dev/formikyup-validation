'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './SignupForm.css';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Trop court !')
    .max(50, 'Trop long !')
    .required('Requis'),
  lastName: Yup.string()
    .min(2, 'Trop court !')
    .max(50, 'Trop long !')
    .required('Requis'),
  email: Yup.string().email('Email invalide').required('Requis'),
  departureDate: Yup.date().required('Date de départ requise'),
  arrivalDate: Yup.date()
    .min(Yup.ref('departureDate'), 'La date d\'arrivée doit être après la date de départ')
    .required('Date d\'arrivée requise'),
  departureLocation: Yup.string().required('Lieu de départ requis'),
  arrivalLocation: Yup.string().required('Lieu d\'arrivée requis'),
});

export default function SignupForm() {
  return (
    <div className="signup-container">
      <h1>Réservation de voyage</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          departureDate: '',
          arrivalDate: '',
          departureLocation: '',
          arrivalLocation: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <Field type="text" name="firstName" placeholder="Prénom" />
              <ErrorMessage name="firstName" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <Field type="text" name="lastName" placeholder="Nom" />
              <ErrorMessage name="lastName" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <Field type="date" name="departureDate" />
              <ErrorMessage name="departureDate" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <Field type="date" name="arrivalDate" />
              <ErrorMessage name="arrivalDate" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <Field type="text" name="departureLocation" placeholder="Lieu de départ" />
              <ErrorMessage name="departureLocation" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <Field type="text" name="arrivalLocation" placeholder="Lieu d'arrivée" />
              <ErrorMessage name="arrivalLocation" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi...' : 'Réserver'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}