import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients.json';
import { PublicPatient, NewPatientEntry, Patient } from '../types';
import { loadPatientsJSON } from '../utils';
const patients: Patient[] = loadPatientsJSON(patientsData);
const getPatients = (): PublicPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatientById = (id: string): Patient | undefined => {
  const foundPatient = patients.find((patient) => patient.id === id);
  return foundPatient;
};

export default {
  getPatients,
  addPatient,
  getPatientById,
};
