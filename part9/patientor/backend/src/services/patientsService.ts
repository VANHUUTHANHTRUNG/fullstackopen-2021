import { NewEntry, Entry } from './../../../frontend/src/types';
import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import { NewPatient, Patient } from '../types';
import { loadPatientsJSON } from '../utils';
let patients: Patient[] = loadPatientsJSON(patientsData);
const getPatients = (): Patient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries, ssn }) => ({
      id,
      name,
      ssn,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (patientEntry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patientEntry,
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  const foundPatient = patients.find((patient) => patient.id === id);
  return foundPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry | undefined => {
  const foundPatient = patients.find((patient) => patient.id === patientId);
  if (!foundPatient) return undefined;
  try {
    switch (entry.type) {
      case 'Hospital': {
        const newEntry = {
          id: uuid(),
          ...entry,
        };
        patients = patients.map((patient) => {
          return patient.id === patientId
            ? { ...patient, entries: [...patient.entries, newEntry] }
            : patient;
        });
        return newEntry;
      }
      case 'OccupationalHealthcare': {
        const newEntry = {
          id: uuid(),
          ...entry,
        };
        patients = patients.map((patient) => {
          return patient.id === patientId
            ? { ...patient, entries: [...patient.entries, newEntry] }
            : patient;
        });
        return newEntry;
      }
      case 'HealthCheck': {
        const newEntry = {
          id: uuid(),
          ...entry,
        };
        patients.map((patient) => {
          return patient.id === patientId
            ? [...patient.entries, newEntry]
            : patient.entries;
        });
        return newEntry;
      }
      default:
        throw new Error('Wrong entry type');
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export default {
  getPatients,
  addPatient,
  getPatientById,
  addEntry,
};
