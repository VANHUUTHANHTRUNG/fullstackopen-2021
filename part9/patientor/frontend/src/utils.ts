import {
  Discharge,
  Entry,
  Gender,
  HealthCheckRating,
  NewEntry,
  SickLeave,
  Diagnosis,
  CommonEntryInfo,
  // HealthCheckEntry,
  // OccupationalHealthcareEntry,
  // HospitalEntry,
} from './types';
import { SemanticICONS } from 'semantic-ui-react';
// import { EntryFormValues } from './AddEntryModal/AddEntryForm';

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isEntries = (array: unknown): array is Entry[] => {
  return Array.isArray(array);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export const parseName = (name: unknown): string => {
  if (!name || !isString(name))
    throw new Error(`Incorrect or missing name:  ${JSON.stringify(name)}`);
  return name;
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date))
    throw new Error(`Incorrect or missing date:  ${JSON.stringify(date)}`);
  return date;
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender))
    throw new Error('Incorrect or missing gender');
  return gender;
};

export const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation))
    throw new Error('Incorrect or missing occupation');
  return occupation;
};

export const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !ssn.includes('-'))
    throw new Error('Incorrect or missing ssn: ');
  return ssn;
};

export const parseId = (id: unknown): string => {
  if (!id || !isString(id) || !(id.length > 10))
    throw new Error('Incorrect or missing id');
  return id;
};

/////////////////////////////////////////////////////////////////

export const genderToIconName = (gender: Gender): SemanticICONS => {
  switch (gender) {
    case 'male':
      return 'man';
    case 'female':
      return 'woman';
    default:
      return 'other gender';
  }
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const isHealthCheckRating = (
  rating: any
): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

export const isEntryType = (entry: any): entry is Entry => {
  return (
    entry.type === 'HealthCheck' ||
    entry.type === 'OccupationalHealthcare' ||
    entry.type === 'Hospital'
  );
};

export const parseEntries = (entries: unknown[]): Entry[] => {
  const allChecked: boolean = entries.reduce(
    (result: boolean, entry) => result && isEntryType(entry),
    true
  );
  if (allChecked)
    throw new Error(`Incorrect or missing entries: ${JSON.stringify(entries)}`);

  return entries as Entry[];
};

const isValidNewEntryType = (entry: any): entry is NewEntry => {
  return (
    entry.type === 'HealthCheck' ||
    entry.type === 'OccupationalHealthcare' ||
    entry.type === 'Hospital'
  );
};

export const parseEntry = (entry: any): NewEntry => {
  if (!entry || !isValidNewEntryType(entry))
    throw new Error(
      `Incorrect or missing entry type: ${JSON.stringify(entry)}`
    );
  return entry;
};

export const parseDescription = (description: unknown): string => {
  if (!description || !isString(description))
    throw new Error('Incorrect or missing description: ');
  return description;
};

export const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist))
    throw new Error('Incorrect or missing description ');
  return specialist;
};

export const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating === 'undefined' || rating === null || !isHealthCheckRating(rating))
    throw new Error('Incorrect or missing health check rating ');
  return rating;
};

export const parseEmployerName = (name: unknown): string => {
  if (!name || !isString(name))
    throw new Error('Incorrect or missing employername');
  return name;
};

export const parseDischargeCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria))
    throw new Error('Incorrect or missing discharge criteria');
  return criteria;
};

export const parseDischarge = (discharge: any): Discharge => {
  if (
    !discharge ||
    (Object.keys(discharge).length === 0 && discharge.constructor === Object)
  )
    return {} as Discharge;
  else {
    if (!discharge.date) throw new Error('Incorrect or missing discharge date');

    if (!discharge.criteria)
      throw new Error('Incorrect or missing discharge criteria');

    const dischargeDate = parseDate(discharge.date);
    const dischargeCriteria = parseDischargeCriteria(discharge.criteria);

    return {
      date: dischargeDate,
      criteria: dischargeCriteria,
    };
  }
};

export const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    !sickLeave ||
    (Object.keys(sickLeave as SickLeave).length === 0 &&
      (sickLeave as SickLeave).constructor === Object)
  ) {
    return {} as SickLeave;
  } else {
    if (!(sickLeave as SickLeave).startDate) {
      throw new Error('Incorrect or missing start date for sick leave');
    }
    if (!(sickLeave as SickLeave).endDate) {
      throw new Error('Incorrect or missing end date for sick leave');
    }
    const startDate = parseDate((sickLeave as SickLeave).startDate);
    const endDate = parseDate((sickLeave as SickLeave).endDate);

    return {
      startDate,
      endDate,
    };
  }
};

export const parseDiagnosisCode = (
  diagnosisCodes: unknown
): Array<Diagnosis['code']> => {
  if (!diagnosisCodes) return [] as Array<Diagnosis['code']>;

  if (!Array.isArray(diagnosisCodes)) {
    throw new Error('Incorrect diagnosisCode');
  }

  const validDiagnosisCodes = diagnosisCodes.every((code: any) =>
    isString(code)
  );

  if (validDiagnosisCodes) {
    return diagnosisCodes as Array<Diagnosis['code']>;
  } else {
    throw new Error('Incorrect diagnosisCode');
  }
};

export const toNewEntry = (newEntry: { newEntry: unknown }): NewEntry => {
  const validEntry = parseEntry(newEntry);
  if (!validEntry) throw new Error('Invalid entry');

  const commonInfo: CommonEntryInfo = {
    date: parseDate(validEntry.date),
    description: parseDescription(validEntry.description),
    specialist: parseSpecialist(validEntry.specialist),
    diagnosisCodes: parseDiagnosisCode(validEntry.diagnosisCodes),
  };

  switch (validEntry.type) {
    case 'Hospital':
      return {
        ...commonInfo,
        type: validEntry.type,
        discharge: parseDischarge(validEntry.discharge),
      };
    case 'HealthCheck':
      return {
        ...commonInfo,
        type: validEntry.type,
        healthCheckRating: parseHealthCheckRating(validEntry.healthCheckRating),
      };
    case 'OccupationalHealthcare':
      return {
        ...commonInfo,
        type: validEntry.type,
        employerName: parseEmployerName(validEntry.employerName),
        sickLeave: parseSickLeave(validEntry.sickLeave),
      };
    default:
      return assertNever(validEntry);
  }
};

// export const getEntryTypeFromForm = (values: EntryFormValues)
