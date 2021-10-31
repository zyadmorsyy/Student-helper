/* eslint-disable consistent-return */
// eslint-disable-next-line import/prefer-default-export
export const courseType = (type) => {
  if (type === 'majorElective') return 'Major Elective';
  if (type === 'majorRequirment') return 'Major Requirment';
  if (type === 'minorRequirment') return 'Minor Requirment';
  if (type === 'universityRequirment') return 'University Requirment';
  if (type === 'facultyRequirment') return 'Faculty Requirment';
  if (type === 'universityElective') return 'University Elective';

  return 'no type';
};
