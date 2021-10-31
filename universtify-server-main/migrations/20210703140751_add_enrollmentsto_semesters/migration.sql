-- AddForeignKey
ALTER TABLE "Enrollment" ADD FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE SET NULL ON UPDATE CASCADE;
