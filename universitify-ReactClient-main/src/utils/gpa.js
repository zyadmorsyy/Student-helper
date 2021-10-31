/* eslint-disable consistent-return */
// eslint-disable-next-line import/prefer-default-export
export const gpaConverter = (grade) => {
  if (grade > 90) return 'A';
  if (grade <= 90 && grade > 85) return 'A-';
  if (grade <= 85 && grade > 80) return 'B+';
  if (grade <= 80 && grade > 75) return 'B';
  if (grade <= 75 && grade > 70) return 'B-';
  if (grade <= 70 && grade > 65) return 'C+';
  if (grade <= 65 && grade > 60) return 'C';

  if (grade <= 60 && grade > 55) return 'C-';
  if (grade <= 55 && grade > 53) return 'D+';
  if (grade <= 53 && grade >= 50) return 'D';
  if (grade < 50) return 'F';
};
