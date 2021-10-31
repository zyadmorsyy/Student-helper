--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3 (Ubuntu 13.3-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.3 (Ubuntu 13.3-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Gender; Type: TYPE; Schema: public; Owner: abosamra
--

CREATE TYPE public."Gender" AS ENUM (
    'MALE',
    'FEMALE'
);


ALTER TYPE public."Gender" OWNER TO abosamra;

--
-- Name: SemesterStatus; Type: TYPE; Schema: public; Owner: abosamra
--

CREATE TYPE public."SemesterStatus" AS ENUM (
    'open',
    'closed',
    'current',
    'finished'
);


ALTER TYPE public."SemesterStatus" OWNER TO abosamra;

--
-- Name: SemesterType; Type: TYPE; Schema: public; Owner: abosamra
--

CREATE TYPE public."SemesterType" AS ENUM (
    'FALL',
    'SPRING',
    'SUMMER'
);


ALTER TYPE public."SemesterType" OWNER TO abosamra;

--
-- Name: Type; Type: TYPE; Schema: public; Owner: abosamra
--

CREATE TYPE public."Type" AS ENUM (
    'majorElective',
    'majorRequirment',
    'minorRequirment',
    'universityRequirment',
    'facultyRequirment',
    'universityElective'
);


ALTER TYPE public."Type" OWNER TO abosamra;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Coordinator; Type: TABLE; Schema: public; Owner: abosamra
--

CREATE TABLE public."Coordinator" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    fname character varying(255) NOT NULL,
    lname character varying(255) NOT NULL,
    phone text,
    gender public."Gender",
    password text,
    email text NOT NULL,
    avatar text,
    role text DEFAULT 'coordinator'::text NOT NULL
);


ALTER TABLE public."Coordinator" OWNER TO abosamra;

--
-- Name: Coordinator_id_seq; Type: SEQUENCE; Schema: public; Owner: abosamra
--

CREATE SEQUENCE public."Coordinator_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Coordinator_id_seq" OWNER TO abosamra;

--
-- Name: Coordinator_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abosamra
--

ALTER SEQUENCE public."Coordinator_id_seq" OWNED BY public."Coordinator".id;


--
-- Name: Course; Type: TABLE; Schema: public; Owner: abosamra
--

CREATE TABLE public."Course" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    discreption text,
    credit integer,
    available boolean DEFAULT true NOT NULL,
    "courseCode" text,
    name text NOT NULL,
    level integer,
    "majorId" integer,
    "minorId" integer,
    "coordinatorId" integer,
    "isElective" boolean DEFAULT false NOT NULL,
    type public."Type",
    "instructorId" integer
);


ALTER TABLE public."Course" OWNER TO abosamra;

--
-- Name: Course_id_seq; Type: SEQUENCE; Schema: public; Owner: abosamra
--

CREATE SEQUENCE public."Course_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Course_id_seq" OWNER TO abosamra;

--
-- Name: Course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abosamra
--

ALTER SEQUENCE public."Course_id_seq" OWNED BY public."Course".id;


--
-- Name: Enrollment; Type: TABLE; Schema: public; Owner: abosamra
--

CREATE TABLE public."Enrollment" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "supervisorId" integer,
    "studentID" integer,
    "courseID" integer,
    "isAproved" boolean DEFAULT false NOT NULL,
    status text DEFAULT 'in review'::text NOT NULL,
    "semesterId" integer,
    credit integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."Enrollment" OWNER TO abosamra;

--
-- Name: Enrollment_id_seq; Type: SEQUENCE; Schema: public; Owner: abosamra
--

CREATE SEQUENCE public."Enrollment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Enrollment_id_seq" OWNER TO abosamra;

--
-- Name: Enrollment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abosamra
--

ALTER SEQUENCE public."Enrollment_id_seq" OWNED BY public."Enrollment".id;


--
-- Name: FinishedCourses; Type: TABLE; Schema: public; Owner: abosamra
--

CREATE TABLE public."FinishedCourses" (
    "courseId" integer NOT NULL,
    "studentID" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    grade double precision,
    id integer NOT NULL,
    "semesterId" integer,
    credit integer,
    "instructorId" integer
);


ALTER TABLE public."FinishedCourses" OWNER TO abosamra;

--
-- Name: FinishedCourses_id_seq; Type: SEQUENCE; Schema: public; Owner: abosamra
--

CREATE SEQUENCE public."FinishedCourses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."FinishedCourses_id_seq" OWNER TO abosamra;

--
-- Name: FinishedCourses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abosamra
--

ALTER SEQUENCE public."FinishedCourses_id_seq" OWNED BY public."FinishedCourses".id;


--
-- Name: Major; Type: TABLE; Schema: public; Owner: abosamra
--

CREATE TABLE public."Major" (
    id integer NOT NULL,
    code text NOT NULL,
    name text
);


ALTER TABLE public."Major" OWNER TO abosamra;

--
-- Name: Major_id_seq; Type: SEQUENCE; Schema: public; Owner: abosamra
--

CREATE SEQUENCE public."Major_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Major_id_seq" OWNER TO abosamra;

--
-- Name: Major_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abosamra
--

ALTER SEQUENCE public."Major_id_seq" OWNED BY public."Major".id;


--
-- Name: Notifications; Type: TABLE; Schema: public; Owner: abosamra
--

CREATE TABLE public."Notifications" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "supervisorId" integer,
    "studentID" integer,
    status integer DEFAULT 0,
    data jsonb NOT NULL,
    "coordinatorId" integer
);


ALTER TABLE public."Notifications" OWNER TO abosamra;

--
-- Name: Notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: abosamra
--

CREATE SEQUENCE public."Notifications_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Notifications_id_seq" OWNER TO abosamra;

--
-- Name: Notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abosamra
--

ALTER SEQUENCE public."Notifications_id_seq" OWNED BY public."Notifications".id;


--
-- Name: Semester; Type: TABLE; Schema: public; Owner: abosamra
--

CREATE TABLE public."Semester" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    type public."SemesterType" DEFAULT 'FALL'::public."SemesterType" NOT NULL,
    "coordinatorId" integer,
    year integer DEFAULT 2021,
    status public."SemesterStatus" DEFAULT 'open'::public."SemesterStatus" NOT NULL
);


ALTER TABLE public."Semester" OWNER TO abosamra;

--
-- Name: Semester_id_seq; Type: SEQUENCE; Schema: public; Owner: abosamra
--

CREATE SEQUENCE public."Semester_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Semester_id_seq" OWNER TO abosamra;

--
-- Name: Semester_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abosamra
--

ALTER SEQUENCE public."Semester_id_seq" OWNED BY public."Semester".id;


--
-- Name: Student; Type: TABLE; Schema: public; Owner: abosamra
--

CREATE TABLE public."Student" (
    id integer NOT NULL,
    "uniCode" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    fname character varying(255) NOT NULL,
    lname character varying(255) NOT NULL,
    gender public."Gender",
    password text,
    email text NOT NULL,
    "supervisorId" integer,
    avatar text DEFAULT '/static/images/avatars/avatar_4'::text,
    "majorId" integer,
    "minorId" integer,
    "coordinatorId" integer,
    role text DEFAULT 'student'::text NOT NULL,
    "numericalGPA" double precision DEFAULT 4 NOT NULL,
    "numericalLastTermGPA" double precision DEFAULT 4,
    "creditDone" integer DEFAULT 0 NOT NULL,
    level integer DEFAULT 1 NOT NULL
);


ALTER TABLE public."Student" OWNER TO abosamra;

--
-- Name: StudentSemester; Type: TABLE; Schema: public; Owner: abosamra
--

CREATE TABLE public."StudentSemester" (
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "studentId" integer NOT NULL,
    "semesterId" integer NOT NULL,
    "semesterGPA" double precision DEFAULT 4,
    "creditDone" integer DEFAULT 0,
    "creditHave" integer DEFAULT 18
);


ALTER TABLE public."StudentSemester" OWNER TO abosamra;

--
-- Name: Student_id_seq; Type: SEQUENCE; Schema: public; Owner: abosamra
--

CREATE SEQUENCE public."Student_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Student_id_seq" OWNER TO abosamra;

--
-- Name: Student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abosamra
--

ALTER SEQUENCE public."Student_id_seq" OWNED BY public."Student".id;


--
-- Name: Supervisor; Type: TABLE; Schema: public; Owner: abosamra
--

CREATE TABLE public."Supervisor" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    fname character varying(255) NOT NULL,
    lname character varying(255) NOT NULL,
    gender public."Gender",
    password text,
    email text NOT NULL,
    phone text,
    avatar text,
    "coordinatorId" integer,
    role text DEFAULT 'supervisor'::text NOT NULL
);


ALTER TABLE public."Supervisor" OWNER TO abosamra;

--
-- Name: Supervisor_id_seq; Type: SEQUENCE; Schema: public; Owner: abosamra
--

CREATE SEQUENCE public."Supervisor_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Supervisor_id_seq" OWNER TO abosamra;

--
-- Name: Supervisor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abosamra
--

ALTER SEQUENCE public."Supervisor_id_seq" OWNED BY public."Supervisor".id;


--
-- Name: _CoursePrerequisites; Type: TABLE; Schema: public; Owner: abosamra
--

CREATE TABLE public."_CoursePrerequisites" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CoursePrerequisites" OWNER TO abosamra;

--
-- Name: _CourseToSemester; Type: TABLE; Schema: public; Owner: abosamra
--

CREATE TABLE public."_CourseToSemester" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CourseToSemester" OWNER TO abosamra;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: abosamra
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO abosamra;

--
-- Name: Coordinator id; Type: DEFAULT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Coordinator" ALTER COLUMN id SET DEFAULT nextval('public."Coordinator_id_seq"'::regclass);


--
-- Name: Course id; Type: DEFAULT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Course" ALTER COLUMN id SET DEFAULT nextval('public."Course_id_seq"'::regclass);


--
-- Name: Enrollment id; Type: DEFAULT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Enrollment" ALTER COLUMN id SET DEFAULT nextval('public."Enrollment_id_seq"'::regclass);


--
-- Name: FinishedCourses id; Type: DEFAULT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."FinishedCourses" ALTER COLUMN id SET DEFAULT nextval('public."FinishedCourses_id_seq"'::regclass);


--
-- Name: Major id; Type: DEFAULT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Major" ALTER COLUMN id SET DEFAULT nextval('public."Major_id_seq"'::regclass);


--
-- Name: Notifications id; Type: DEFAULT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Notifications" ALTER COLUMN id SET DEFAULT nextval('public."Notifications_id_seq"'::regclass);


--
-- Name: Semester id; Type: DEFAULT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Semester" ALTER COLUMN id SET DEFAULT nextval('public."Semester_id_seq"'::regclass);


--
-- Name: Student id; Type: DEFAULT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Student" ALTER COLUMN id SET DEFAULT nextval('public."Student_id_seq"'::regclass);


--
-- Name: Supervisor id; Type: DEFAULT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Supervisor" ALTER COLUMN id SET DEFAULT nextval('public."Supervisor_id_seq"'::regclass);


--
-- Data for Name: Coordinator; Type: TABLE DATA; Schema: public; Owner: abosamra
--

COPY public."Coordinator" (id, "createdAt", "updatedAt", fname, lname, phone, gender, password, email, avatar, role) FROM stdin;
1	2021-06-21 01:03:46.422	2021-06-21 01:03:46.423	Karim	Karim	628-572-3860	MALE	9_UaRTOAzwi2kiA	Rahsaan33@yahoo.com	/static/images/avatars/avatar_0.png	coordinator
2	2021-06-21 01:03:46.422	2021-06-21 01:03:46.423	Ahmed	Hosni	736.545.2297	MALE	iB0tGOA3xUJ9Iu5	Perry_Leannon@hotmail.com	/static/images/avatars/avatar_0.png	coordinator
3	2021-06-21 01:03:46.422	2021-06-21 01:03:46.423	Kamal	Hosni	700.686.6586 x35399	MALE	x0UR31TmU6uEZoz	Alene_Romaguera@yahoo.com	/static/images/avatars/avatar_2.png	coordinator
4	2021-06-21 01:03:46.423	2021-06-21 01:03:46.423	Abdelrahman	Abdelrahman	432-520-2825 x2710	MALE	1Pv_3ZDXEdKhE2E	Millie_Brekke27@gmail.com	/static/images/avatars/avatar_0.png	coordinator
5	2021-06-21 01:03:46.423	2021-06-21 01:03:46.423	Hussin	Karim	1-279-938-0345 x3036	MALE	sSEtIASdTPd5Rln	Rigoberto46@hotmail.com	/static/images/avatars/avatar_2.png	coordinator
6	2021-06-21 01:03:46.423	2021-06-21 01:03:46.423	Ali	Abdelrahman	523.232.4605 x0639	MALE	KFIU13uDBO41g4i	Nico_Lehner43@gmail.com	/static/images/avatars/avatar_3.png	coordinator
7	2021-06-21 01:03:46.423	2021-06-21 01:03:46.423	Mahmoud	Ahmed	421-263-8447	MALE	l5bC9h1Xq2g7gG4	Emmie94@gmail.com	/static/images/avatars/avatar_1.png	coordinator
8	2021-06-21 01:03:46.423	2021-06-21 01:03:46.423	Mohamed	Abdelrahman	(989) 600-8673	MALE	MkbRQzpubyHhSFd	Aiyana.Smith@hotmail.com	/static/images/avatars/avatar_3.png	coordinator
9	2021-06-21 01:03:46.423	2021-06-21 01:03:46.423	Ali	Kamal	775-632-0770 x653	MALE	v_3k4KG1xg3_CmY	Roma19@yahoo.com	/static/images/avatars/avatar_3.png	coordinator
10	2021-06-21 01:03:46.423	2021-06-21 01:03:46.423	Ahmed	Mahmoud	(897) 954-7548	MALE	owcsDU6Nmr_yXG0	Kim_Ortiz82@yahoo.com	/static/images/avatars/avatar_0.png	coordinator
\.


--
-- Data for Name: Course; Type: TABLE DATA; Schema: public; Owner: abosamra
--

COPY public."Course" (id, "createdAt", "updatedAt", discreption, credit, available, "courseCode", name, level, "majorId", "minorId", "coordinatorId", "isElective", type, "instructorId") FROM stdin;
83	2021-07-04 16:18:20.487	2021-07-04 16:18:20.488	test	2	t	MK33	test	1	2	\N	1	t	majorElective	9
1	2021-06-21 01:23:17.181	2021-07-04 16:34:17.459	English Elementary	0	t	ENG EL	English Elementary	1	\N	\N	1	f	universityRequirment	9
2	2021-06-21 01:25:27.261	2021-07-04 16:34:17.464	English KET/KET Advanced	2	t	ENG KET	English KET/KET Advanced	1	\N	\N	1	f	universityRequirment	9
3	2021-06-21 01:26:44.603	2021-07-04 16:34:17.466	English PET/PET Advanced	2	t	ENG PET	English PET/PET Advanced	1	\N	\N	1	f	universityRequirment	9
4	2021-06-21 01:27:29.612	2021-07-04 16:34:17.468	Introduction to Computer	2	t	CSC101	Introduction to Computer	1	\N	\N	1	f	universityRequirment	9
5	2021-06-21 01:28:02.191	2021-07-04 16:34:17.47	Human Rights	2	t	PSC110	Human Rights	1	\N	\N	1	f	universityRequirment	9
6	2021-06-21 01:36:09.762	2021-07-04 16:34:17.471	Small Business Management	2	t	MGT100	Small Business Management	1	\N	\N	1	f	universityElective	9
7	2021-06-21 01:47:36.021	2021-07-04 16:34:17.473	Introduction to Psychology	2	t	PSY101	Introduction to Psychology	1	\N	\N	1	f	universityElective	1
8	2021-06-21 01:48:14.117	2021-07-04 16:34:17.474	Introduction to Sociology	2	t	SOC101	Introduction to Sociology	1	\N	\N	1	f	universityElective	1
9	2021-06-21 01:48:33.563	2021-07-04 16:34:17.476	Introduction to Environmental Science	2	t	ENV101	Introduction to Environmental Science	1	\N	\N	1	f	universityElective	9
10	2021-06-21 01:49:06.737	2021-07-04 16:34:17.477	Specialized Computer Applications	2	t	CSC102	Specialized Computer Applications	1	\N	\N	1	f	universityElective	9
11	2021-06-21 01:49:46.557	2021-07-04 16:34:17.479	Scientific Thinking	2	t	SCT101	Scientific Thinking	1	\N	\N	1	f	universityElective	9
12	2021-06-21 01:49:59.125	2021-07-04 16:34:17.48	Communication and Presentation Skills	2	t	CPS101	Communication and Presentation Skills	1	\N	\N	1	f	universityElective	1
13	2021-06-21 01:56:01.082	2021-07-04 16:34:17.481	Introduction to Management	3	t	MGT101	Introduction to Management	1	\N	\N	1	f	facultyRequirment	1
14	2021-06-21 01:56:21.807	2021-07-04 16:34:17.483	Introduction to Accounting	3	t	ACT101	Introduction to Accounting	1	\N	\N	1	f	facultyRequirment	1
15	2021-06-21 01:57:21.883	2021-07-04 16:34:17.484	Business Mathematics	3	t	MAT101	Business Mathematics	1	\N	\N	1	f	facultyRequirment	1
16	2021-06-21 01:57:42.664	2021-07-04 16:34:17.485	Business Law	3	t	LAW101	Business Law	1	\N	\N	1	f	facultyRequirment	1
17	2021-06-21 01:58:03.024	2021-07-04 16:34:17.486	Introduction to Macroeconomics	3	t	ECN102	Introduction to Macroeconomics	1	\N	\N	1	f	facultyRequirment	1
18	2021-06-21 01:58:30.91	2021-07-04 16:34:17.487	Organization Behavior	3	t	MGT102	Organization Behavior	1	\N	\N	1	f	facultyRequirment	1
19	2021-06-21 01:58:54.731	2021-07-04 16:34:17.488	Introduction to Business Statistics	3	t	SAT101	Introduction to Business Statistics	1	\N	\N	1	f	facultyRequirment	1
20	2021-06-21 01:59:34.192	2021-07-04 16:34:17.489	Financial Accounting	3	t	ACT102	Financial Accounting	1	\N	\N	1	f	facultyRequirment	1
21	2021-06-21 01:59:56.481	2021-07-04 16:34:17.49	Research Methodology	3	t	REM101	Research Methodology	1	\N	\N	1	f	facultyRequirment	1
22	2021-06-21 02:00:25.827	2021-07-04 16:34:17.492	Corporate Finance (1)	3	t	FIN201	Corporate Finance (1)	2	\N	\N	1	f	facultyRequirment	1
23	2021-06-21 02:00:57.194	2021-07-04 16:34:17.493	Production and Operations Management	3	t	MGT201	Production and Operations Management	2	\N	\N	1	f	facultyRequirment	1
24	2021-06-21 02:01:31.648	2021-07-04 16:34:17.494	Cost Accounting	3	t	ACT201	Cost Accounting	2	\N	\N	1	f	facultyRequirment	1
25	2021-06-21 02:01:55.155	2021-07-04 16:34:17.495	Introduction to Management Information Systems	3	t	MIS201	Introduction to Management Information Systems	2	\N	\N	1	f	facultyRequirment	1
26	2021-06-21 02:02:18.532	2021-07-04 16:34:17.496	Introduction to Programming	3	t	MIS202	Introduction to Programming	2	\N	\N	1	f	facultyRequirment	1
27	2021-06-21 02:02:45.322	2021-07-04 16:34:17.497	Introduction to Marketing	3	t	MKT201	Introduction to Marketing	2	\N	\N	1	f	facultyRequirment	1
28	2021-06-21 02:03:09.088	2021-07-04 16:34:17.498	Advanced Statistics	3	t	SAT201	Advanced Statistics	2	\N	\N	1	f	facultyRequirment	1
29	2021-06-21 02:03:32.04	2021-07-04 16:34:17.499	Money and Banking	3	t	ECN201	Money and Banking	2	\N	\N	1	f	facultyRequirment	1
30	2021-06-21 02:03:56.141	2021-07-04 16:34:17.501	Introduction to Human Resources Management	3	t	HRM201	Introduction to Human Resources Management	2	\N	\N	1	f	facultyRequirment	1
31	2021-06-21 02:04:15.866	2021-07-04 16:34:17.502	Strategic Management	3	t	MGT401	Strategic Management	2	\N	\N	1	f	facultyRequirment	1
32	2021-06-21 02:04:39.469	2021-07-04 16:34:17.518	Feasibility Studies	3	t	MGT402	Feasibility Studies	2	\N	\N	1	f	facultyRequirment	1
33	2021-06-21 02:05:40.807	2021-07-04 16:34:17.519	Services Marketing	3	t	MKT301	Services Marketing	3	2	\N	1	f	majorRequirment	1
34	2021-06-21 02:07:01.978	2021-07-04 16:34:17.52	Consumer Behavior	3	t	MKT302	Consumer Behavior	3	2	\N	1	f	majorRequirment	1
35	2021-06-21 02:07:12.792	2021-07-04 16:34:17.522	Marketing Research	3	t	MKT303	Marketing Research	3	2	\N	1	f	majorRequirment	1
36	2021-06-21 02:07:24.042	2021-07-04 16:34:17.523	Integrated Marketing Communication	3	t	MKT304	Integrated Marketing Communication	3	2	\N	1	f	majorRequirment	1
37	2021-06-21 02:07:49.829	2021-07-04 16:34:17.524	International Marketing	3	t	MKT305	International Marketing	3	2	\N	1	f	majorRequirment	1
38	2021-06-21 02:08:06.893	2021-07-04 16:34:17.526	E-Marketing	3	t	MKT306	E-Marketing	3	2	\N	1	f	majorRequirment	1
39	2021-06-21 02:08:40.68	2021-07-04 16:34:17.527	Strategic Marketing	3	t	MKT401	Strategic Marketing	4	2	\N	1	f	majorRequirment	1
40	2021-06-21 02:09:01.907	2021-07-04 16:34:17.528	Sales Management	3	t	MKT402	Sales Management	4	2	\N	1	f	majorRequirment	1
41	2021-06-21 02:09:55.761	2021-07-04 16:34:17.529	Graduation Project 1	3	t	GMK401	Graduation Project 1	4	2	\N	1	f	majorRequirment	1
42	2021-06-21 02:10:05.158	2021-07-04 16:34:17.53	Graduation Project 2	3	t	GMK402	Graduation Project 2	4	2	\N	1	f	majorRequirment	1
43	2021-06-21 02:11:09.407	2021-07-04 16:34:17.531	Insurance and Risk Management	3	t	MAT301	Insurance and Risk Management	3	3	\N	1	f	majorRequirment	1
44	2021-06-21 02:11:43.246	2021-07-04 16:34:17.533	Corporate Finance (2)	3	t	FIN301	Corporate Finance (2)	3	3	\N	1	f	majorRequirment	1
45	2021-06-21 02:12:05.806	2021-07-04 16:34:17.534	Bank Management	3	t	FIN302	Bank Management	3	3	\N	1	f	majorRequirment	1
46	2021-06-21 02:12:26.231	2021-07-04 16:34:17.535	Investment and Portfolio Management	3	t	FIN303	Investment and Portfolio Management	3	3	\N	1	f	majorRequirment	1
47	2021-06-21 02:12:46.349	2021-07-04 16:34:17.536	Financial Institutions	3	t	FIN304	Financial Institutions	3	3	\N	1	f	majorRequirment	1
48	2021-06-21 02:13:06.673	2021-07-04 16:34:17.537	Financial Markets	3	t	FIN305	Financial Markets	3	3	\N	1	f	majorRequirment	1
49	2021-06-21 02:13:48.102	2021-07-04 16:34:17.538	Financial Statements Analysis	3	t	FIN401	Financial Statements Analysis	4	3	\N	1	f	majorRequirment	1
50	2021-06-21 02:14:08.771	2021-07-04 16:34:17.539	International Finance	3	t	FIN402	International Finance	4	3	\N	1	f	majorRequirment	1
51	2021-06-21 02:14:45.306	2021-07-04 16:34:17.54	Graduation Project 1	3	t	GFI401	Graduation Project 1	4	3	\N	1	f	majorRequirment	1
52	2021-06-21 02:15:10.105	2021-07-04 16:34:17.541	Graduation Project 2	3	t	GFI402	Graduation Project 2	4	3	\N	1	f	majorRequirment	1
53	2021-06-21 02:15:56.398	2021-07-04 16:34:17.542	Performance Management	3	t	HRM301	Performance Management	3	4	\N	1	f	majorRequirment	1
55	2021-06-21 02:16:35.244	2021-07-04 16:34:17.544	Human Resources Planning	3	t	HRM303	Human Resources Planning	3	4	\N	1	f	majorRequirment	1
54	2021-06-21 02:16:17.283	2021-07-04 16:34:17.545	Recruitment and Selection	3	t	HRM302	Recruitment and Selection	3	4	\N	1	f	majorRequirment	1
56	2021-06-21 02:17:36.526	2021-07-04 16:34:17.546	Training and Development	3	t	HRM304	Training and Development	3	4	\N	1	f	majorRequirment	1
57	2021-06-21 02:18:55.776	2021-07-04 16:34:17.547	International Human Resources Management	3	t	HRM305	International Human Resources Management	3	4	\N	1	f	majorRequirment	1
58	2021-06-21 02:19:09.74	2021-07-04 16:34:17.548	Job Analysis and Design	3	t	HRM306	Job Analysis and Design	3	4	\N	1	f	majorRequirment	1
59	2021-06-21 02:19:43.992	2021-07-04 16:34:17.549	Strategic Human Resources Management	3	t	HRM401	Strategic Human Resources Management	4	4	\N	1	f	majorRequirment	1
60	2021-06-21 02:20:07.267	2021-07-04 16:34:17.55	Compensation and Rewards	3	t	HRM402	Compensation and Rewards	4	4	\N	1	f	majorRequirment	1
61	2021-06-21 02:20:35.62	2021-07-04 16:34:17.551	Graduation Project 1	3	t	GHR401	Graduation Project 1	4	4	\N	1	f	majorRequirment	1
62	2021-06-21 02:20:49.153	2021-07-04 16:34:17.552	Graduation Project 2	3	t	GHR402	Graduation Project 2	4	4	\N	1	f	majorRequirment	1
63	2021-06-21 02:21:44.149	2021-07-04 16:34:17.553	Auditing	3	t	ACT301	Auditing	3	5	\N	1	f	majorRequirment	1
64	2021-06-21 02:21:55.487	2021-07-04 16:34:17.555	Intermediate Accounting	3	t	ACT302	Intermediate Accounting	3	5	\N	1	f	majorRequirment	1
65	2021-06-21 02:22:11.976	2021-07-04 16:34:17.556	Advanced Cost Accounting	3	t	ACT303	Advanced Cost Accounting	3	5	\N	1	f	majorRequirment	1
66	2021-06-21 02:22:28.918	2021-07-04 16:34:17.557	Managerial Accounting and Budgeting	3	t	ACT304	Managerial Accounting and Budgeting	3	5	\N	1	f	majorRequirment	1
67	2021-06-21 02:22:50.12	2021-07-04 16:34:17.558	Governmental Accounting	3	t	ACT305	Governmental Accounting	3	5	\N	1	f	majorRequirment	1
68	2021-06-21 02:23:12.341	2021-07-04 16:34:17.559	Tax Accounting	3	t	ACT306	Tax Accounting	3	5	\N	1	f	majorRequirment	1
69	2021-06-21 02:27:00.043	2021-07-04 16:34:17.561	Advanced Auditing	3	t	ACT401	Advanced Auditing	4	5	\N	1	f	majorRequirment	1
70	2021-06-21 02:27:21.873	2021-07-04 16:34:17.562	Specialized Accounting	3	t	ACT402	Specialized Accounting	4	5	\N	1	f	majorRequirment	1
71	2021-06-21 02:28:14.25	2021-07-04 16:34:17.563	Graduation Project 1	3	t	GAC401	Graduation Project 1	4	5	\N	1	f	majorRequirment	9
72	2021-06-21 02:28:25.208	2021-07-04 16:34:17.564	Graduation Project 2	3	t	GAC402	Graduation Project 2	4	5	\N	1	f	majorRequirment	9
73	2021-06-21 02:29:08.969	2021-07-04 16:34:17.565	Advanced Programming	3	t	MIS301	Advanced Programming	3	1	\N	1	f	majorRequirment	9
74	2021-06-21 02:29:54.766	2021-07-04 16:34:17.566	E-Commerce	3	t	MIS302	E-Commerce	3	1	\N	1	f	majorRequirment	9
75	2021-06-21 02:30:13.153	2021-07-04 16:34:17.568	Data Base Systems	3	t	MIS303	Data Base Systems	3	1	\N	1	f	majorRequirment	9
76	2021-06-21 02:30:35.339	2021-07-04 16:34:17.569	Advanced Data Base	3	t	MIS305	Advanced Data Base	3	1	\N	1	f	majorRequirment	9
77	2021-06-21 02:30:49.536	2021-07-04 16:34:17.57	System Analysis and Design	3	t	MIS306	System Analysis and Design	3	1	\N	1	f	majorRequirment	9
78	2021-06-21 02:31:03.92	2021-07-04 16:34:17.571	Operating Systems	3	t	MIS307	Operating Systems	3	1	\N	1	f	majorRequirment	9
79	2021-06-21 02:31:21.162	2021-07-04 16:34:17.572	Decision Support Systems	3	t	MIS401	Decision Support Systems	4	1	\N	1	f	majorRequirment	9
80	2021-06-21 02:31:38.313	2021-07-04 16:34:17.574	Computer Networks	3	t	MIS402	Computer Networks	4	1	\N	1	f	majorRequirment	9
81	2021-06-21 02:32:17.51	2021-07-04 16:34:17.575	Graduation Project 1	3	t	GIS401	Graduation Project 1	4	1	\N	1	f	majorRequirment	9
82	2021-06-21 02:32:32.955	2021-07-04 16:34:17.576	Graduation Project 2	3	t	GIS402	Graduation Project 2	4	1	\N	1	f	majorRequirment	9
\.


--
-- Data for Name: Enrollment; Type: TABLE DATA; Schema: public; Owner: abosamra
--

COPY public."Enrollment" (id, "createdAt", "updatedAt", "supervisorId", "studentID", "courseID", "isAproved", status, "semesterId", credit) FROM stdin;
\.


--
-- Data for Name: FinishedCourses; Type: TABLE DATA; Schema: public; Owner: abosamra
--

COPY public."FinishedCourses" ("courseId", "studentID", "createdAt", "updatedAt", grade, id, "semesterId", credit, "instructorId") FROM stdin;
\.


--
-- Data for Name: Major; Type: TABLE DATA; Schema: public; Owner: abosamra
--

COPY public."Major" (id, code, name) FROM stdin;
1	MIS	Management Information Systems
2	MKT	Marketing
3	FIN	Finance
4	HRM	Human Resources Management 
5	ACT	Accounting 
\.


--
-- Data for Name: Notifications; Type: TABLE DATA; Schema: public; Owner: abosamra
--

COPY public."Notifications" (id, "createdAt", "updatedAt", "supervisorId", "studentID", status, data, "coordinatorId") FROM stdin;
\.


--
-- Data for Name: Semester; Type: TABLE DATA; Schema: public; Owner: abosamra
--

COPY public."Semester" (id, "createdAt", "updatedAt", type, "coordinatorId", year, status) FROM stdin;
\.


--
-- Data for Name: Student; Type: TABLE DATA; Schema: public; Owner: abosamra
--

COPY public."Student" (id, "uniCode", "createdAt", "updatedAt", fname, lname, gender, password, email, "supervisorId", avatar, "majorId", "minorId", "coordinatorId", role, "numericalGPA", "numericalLastTermGPA", "creditDone", level) FROM stdin;
2	28f1aab7-5689-43f5-a34d-764b234dc995	2021-06-21 01:03:46.475	2021-06-21 01:03:46.488	Abdelrahman	Mohamed	MALE	LQ5cDpRxrAskL6O	Darren82@hotmail.com	1	/static/images/avatars/avatar_4.png	1	4	9	student	4	4	0	1
3	f46ef056-0bf5-424c-9b2a-061598b89422	2021-06-21 01:03:46.475	2021-06-21 01:03:46.488	Ali	Abdelrahman	MALE	NdztJCA9AW2aYWd	Yessenia53@yahoo.com	8	/static/images/avatars/avatar_5.png	3	5	5	student	4	4	0	1
4	1c55671e-76ca-4536-80ca-26d33b8246ba	2021-06-21 01:03:46.475	2021-06-21 01:03:46.488	Omar	Hussin	MALE	KlfSkP4VdGZ7uD2	Aida.Goldner@yahoo.com	5	/static/images/avatars/avatar_4.png	3	5	8	student	4	4	0	1
5	7a8272d5-3386-457d-ad52-44184272e615	2021-06-21 01:03:46.475	2021-06-21 01:03:46.488	Omar	Ahmed	MALE	Xd5f5BXRyY7TA9z	Gino67@gmail.com	5	/static/images/avatars/avatar_6.png	3	4	2	student	4	4	0	1
6	dd9a0714-7543-44a0-896d-85ff79d2fd0b	2021-06-21 01:03:46.475	2021-06-21 01:03:46.488	Ali	Hosni	MALE	aR1nzaSbdGjXypT	Camilla.Bins79@yahoo.com	10	/static/images/avatars/avatar_4.png	3	5	9	student	4	4	0	1
7	2dcbecac-2d86-4100-b583-7f9b3217de46	2021-06-21 01:03:46.475	2021-06-21 01:03:46.488	Ahmed	Hosni	MALE	saw60Fv_iWTgHWM	Angelo36@hotmail.com	6	/static/images/avatars/avatar_5.png	3	5	8	student	4	4	0	1
8	95b2c389-2468-40cd-9cc5-7ff680da6de7	2021-06-21 01:03:46.476	2021-06-21 01:03:46.488	Mahmoud	Ali	MALE	F0zSMLywtD0AvhK	Lafayette.Stehr@yahoo.com	4	/static/images/avatars/avatar_4.png	1	5	10	student	4	4	0	1
9	079f22b4-8943-4287-91ce-ecbf9760b064	2021-06-21 01:03:46.476	2021-06-21 01:03:46.488	Abdelrahman	Hosni	MALE	lfGqJAdiq0Y9PEN	Mariam_Ebert@hotmail.com	9	/static/images/avatars/avatar_4.png	3	5	1	student	4	4	0	1
10	5c654b8e-b872-4bfa-8434-2f6ba37a8a44	2021-06-21 01:03:46.476	2021-06-21 01:03:46.488	Karim	Mohamed	MALE	KWw2Lqjw5dPNuXd	Kraig_Rogahn@hotmail.com	3	/static/images/avatars/avatar_6.png	1	4	7	student	4	4	0	1
11	0416fc35-a20b-4f8c-8888-2f5b537c8454	2021-06-21 01:03:46.476	2021-06-21 01:03:46.488	Mohamed	Abdelrahman	MALE	ug5WZDxdoUtONGz	Brooke_Hermann@gmail.com	9	/static/images/avatars/avatar_6.png	3	4	6	student	4	4	0	1
12	046a63d0-1075-4a7a-87bc-b0caa4d081e0	2021-06-21 01:03:46.476	2021-06-21 01:03:46.488	Ali	Sameh	MALE	Lz4pOWRqMwZa9gx	Herminia71@hotmail.com	8	/static/images/avatars/avatar_6.png	2	4	7	student	4	4	0	1
14	c36fcddd-d9f7-4ff4-a887-12d8b1e26e2f	2021-06-21 01:03:46.477	2021-06-21 01:03:46.488	Mahmoud	Ahmed	MALE	bd0fjoaUFxcUpAZ	Taurean.Parker@hotmail.com	1	/static/images/avatars/avatar_5.png	3	4	9	student	4	4	0	1
15	cce02cb4-6a74-4132-822c-38af2d51af49	2021-06-21 01:03:46.477	2021-06-21 01:03:46.488	Kamal	Ali	MALE	816EtB_UMFuqirm	Aliya_Yundt74@hotmail.com	4	/static/images/avatars/avatar_6.png	1	4	1	student	4	4	0	1
16	42a43f9b-793a-4184-80ac-674ff2de12f8	2021-06-21 01:03:46.477	2021-06-21 01:03:46.488	Mahmoud	Mahmoud	MALE	qhJbzptuAWxU_Pa	Mertie_Rohan97@gmail.com	2	/static/images/avatars/avatar_6.png	3	4	9	student	4	4	0	1
17	065aa16e-d7b5-4aff-a99f-cf1b51124faf	2021-06-21 01:03:46.477	2021-06-21 01:03:46.488	Mohamed	Omar	MALE	h1O_EOOZ2MQrWXz	Julie.Lowe@hotmail.com	2	/static/images/avatars/avatar_6.png	2	4	4	student	4	4	0	1
18	cf222147-8606-4824-8e94-7d02ea61000e	2021-06-21 01:03:46.477	2021-06-21 01:03:46.488	Kamal	Abdelrahman	MALE	oNWqBZQR4mMiAeY	Garnett55@gmail.com	1	/static/images/avatars/avatar_4.png	3	4	7	student	4	4	0	1
19	78e92948-9b22-4ca5-8766-acf956bdd71b	2021-06-21 01:03:46.477	2021-06-21 01:03:46.488	Abdelrahman	Ali	MALE	GEviNCCcn3yELT0	Luz.Leannon79@hotmail.com	6	/static/images/avatars/avatar_4.png	3	5	2	student	4	4	0	1
20	704c091e-2ba6-494f-b7ff-5418e4e00300	2021-06-21 01:03:46.478	2021-06-21 01:03:46.488	Ahmed	Ali	MALE	gZ694mc7UrCBMhX	Elena94@gmail.com	3	/static/images/avatars/avatar_4.png	2	4	5	student	4	4	0	1
21	558d5ca3-94e2-4d18-bdde-6341c6bb262d	2021-06-21 01:03:46.478	2021-06-21 01:03:46.488	Hussin	Hussin	MALE	aYh4HlXRKClDcSz	Faye29@gmail.com	2	/static/images/avatars/avatar_4.png	2	5	2	student	4	4	0	1
22	9cc812ca-c651-4a81-b104-4dbbf402d544	2021-06-21 01:03:46.478	2021-06-21 01:03:46.488	Mahmoud	Omar	MALE	GCYb_LiXUokYCEp	Alba32@yahoo.com	2	/static/images/avatars/avatar_6.png	1	4	5	student	4	4	0	1
23	bce97107-7eca-4487-8041-cc5eda1932d3	2021-06-21 01:03:46.478	2021-06-21 01:03:46.488	Abdelrahman	Hussin	MALE	M8chbifkXWaetsH	Lonie.Ziemann@hotmail.com	4	/static/images/avatars/avatar_4.png	2	4	2	student	4	4	0	1
24	1f9ce629-8607-49b4-83b5-8d089d960740	2021-06-21 01:03:46.478	2021-06-21 01:03:46.488	Abdelrahman	Hussin	MALE	qf7uFtmS4oYYALE	Freddy.Crooks50@hotmail.com	4	/static/images/avatars/avatar_6.png	1	5	7	student	4	4	0	1
25	284d60f3-384b-42ab-8f52-5ae6bef66764	2021-06-21 01:03:46.478	2021-06-21 01:03:46.488	Mahmoud	Ahmed	MALE	32C5md12XBaF_XT	Leland85@hotmail.com	3	/static/images/avatars/avatar_5.png	1	5	3	student	4	4	0	1
26	0639ed2d-7307-4c12-a576-799d7dafea81	2021-06-21 01:03:46.479	2021-06-21 01:03:46.488	Hussin	Abdelrahman	MALE	xA1jwgpUyVvvaYv	Gabe_Barrows35@gmail.com	5	/static/images/avatars/avatar_4.png	2	4	1	student	4	4	0	1
27	d8b36ff6-dbba-4c12-a3fc-3c7bb3940472	2021-06-21 01:03:46.479	2021-06-21 01:03:46.488	Mohamed	Ahmed	MALE	2FdOzhEGgLJxrCv	Hollis.Hamill@gmail.com	10	/static/images/avatars/avatar_5.png	1	5	7	student	4	4	0	1
28	461db074-9d5f-4461-a7bc-c4251d7e8e55	2021-06-21 01:03:46.479	2021-06-21 01:03:46.488	Karim	Ahmed	MALE	WQ44rf8YyEGhTen	Bernard_Gusikowski@gmail.com	1	/static/images/avatars/avatar_5.png	2	4	6	student	4	4	0	1
29	12f25c95-76c5-4bb7-b24e-e48e14135e29	2021-06-21 01:03:46.479	2021-06-21 01:03:46.488	Mohamed	Ahmed	MALE	FYYXO3TyUjIfEMu	Dax89@gmail.com	8	/static/images/avatars/avatar_6.png	2	4	2	student	4	4	0	1
30	e7cd6110-9bb7-4ce7-bfe9-27466ddd939a	2021-06-21 01:03:46.479	2021-06-21 01:03:46.488	Mohamed	Kamal	MALE	l2O4iTyssUtxN6e	Ophelia.Bradtke@yahoo.com	1	/static/images/avatars/avatar_5.png	3	4	1	student	4	4	0	1
31	ebd6756f-039c-4a16-8c71-f89389fafc27	2021-06-21 01:03:46.479	2021-06-21 01:03:46.488	Ahmed	Ahmed	MALE	XOA0r24XByoxMoi	Colten.Trantow2@gmail.com	5	/static/images/avatars/avatar_4.png	2	4	1	student	4	4	0	1
32	e11b0fbe-f7f7-4ae0-978c-506c3ae50bc4	2021-06-21 01:03:46.479	2021-06-21 01:03:46.488	Sameh	Omar	MALE	cDkgCdbMPYMmYA3	Jace_Kub23@yahoo.com	3	/static/images/avatars/avatar_4.png	1	4	3	student	4	4	0	1
33	c64a3160-fe2e-409a-83eb-96f42db37b42	2021-06-21 01:03:46.48	2021-06-21 01:03:46.488	Karim	Hussin	MALE	8kwkOICxtmUgGnw	Jefferey.Wuckert@gmail.com	8	/static/images/avatars/avatar_4.png	3	5	6	student	4	4	0	1
34	ab176dd3-0c4e-4b47-9fe9-5e54e378b9d9	2021-06-21 01:03:46.48	2021-06-21 01:03:46.488	Karim	Kamal	MALE	Q_rxR85wVfNUVNI	Ezequiel7@hotmail.com	4	/static/images/avatars/avatar_4.png	3	4	3	student	4	4	0	1
13	19a0ac5a-1028-4aa8-b92c-874033512d74	2021-06-21 01:03:46.476	2021-07-04 18:31:25.889	Ahmed	Karim	MALE	Kj_mmPF4VNjnl20	Giuseppe.Kunde46@hotmail.com	9	/static/images/avatars/avatar_4.png	3	2	1	student	4	4	0	1
35	9c4e4067-76c7-462b-b2da-c3d65c475189	2021-06-21 01:03:46.48	2021-06-21 01:03:46.488	Sameh	Hussin	MALE	H8YRYBwNrvPONFi	Deion.Lemke72@yahoo.com	1	/static/images/avatars/avatar_5.png	3	5	10	student	4	4	0	1
36	bbcc19a2-732c-4b9b-a986-7ad8e738fc89	2021-06-21 01:03:46.48	2021-06-21 01:03:46.488	Abdelrahman	Ali	MALE	12Ytqi1EFXSe3Dc	Avery78@gmail.com	2	/static/images/avatars/avatar_6.png	3	4	8	student	4	4	0	1
37	6cb08ac0-407e-4056-b59c-eb32b4731063	2021-06-21 01:03:46.48	2021-06-21 01:03:46.488	Hosni	Ahmed	MALE	e6C5KYgH0OLnaNQ	Ryan.Kshlerin@gmail.com	10	/static/images/avatars/avatar_5.png	1	4	4	student	4	4	0	1
38	c237b8cb-d0e8-4a40-bec5-705d14ed50f3	2021-06-21 01:03:46.48	2021-06-21 01:03:46.488	Hussin	Sameh	MALE	HQ0NJuZTwGD_Jkk	Julie.Hahn49@gmail.com	8	/static/images/avatars/avatar_5.png	1	5	6	student	4	4	0	1
39	5c53e029-0bf2-474c-999d-b7f9ffeab28c	2021-06-21 01:03:46.48	2021-06-21 01:03:46.488	Sameh	Karim	MALE	dwkuD9hNiY1S8XM	Emely_Gulgowski@gmail.com	8	/static/images/avatars/avatar_4.png	1	4	8	student	4	4	0	1
40	160319c9-2b2b-4026-aa1b-3ce531d10266	2021-06-21 01:03:46.48	2021-06-21 01:03:46.488	Hosni	Mahmoud	MALE	c6mqo1Eka_wZ_28	Floyd.Wilderman@yahoo.com	3	/static/images/avatars/avatar_5.png	1	5	4	student	4	4	0	1
41	907ca044-4813-4e93-9632-a0805b633a32	2021-06-21 01:03:46.48	2021-06-21 01:03:46.488	Hosni	Kamal	MALE	nVRWxkKv7dZP5Ir	Mac43@yahoo.com	1	/static/images/avatars/avatar_5.png	2	4	4	student	4	4	0	1
42	94ee4295-c397-4f4d-96e0-07e3b398881e	2021-06-21 01:03:46.481	2021-06-21 01:03:46.488	Sameh	Abdelrahman	MALE	rLArmgcfXGc6N1P	Alivia.Borer18@yahoo.com	7	/static/images/avatars/avatar_6.png	2	5	7	student	4	4	0	1
43	5b064f98-e7e3-451f-a0aa-3f56c764cdd5	2021-06-21 01:03:46.481	2021-06-21 01:03:46.488	Hussin	Karim	MALE	fb8Gs3cDpoZItg6	Alejandra36@hotmail.com	4	/static/images/avatars/avatar_4.png	1	4	7	student	4	4	0	1
44	50e565d6-f614-4b7b-bb49-9fe0791d4fb4	2021-06-21 01:03:46.481	2021-06-21 01:03:46.488	Sameh	Mohamed	MALE	j0uxdXH0yKdE0bn	Raphaelle.Cruickshank@yahoo.com	3	/static/images/avatars/avatar_5.png	3	4	1	student	4	4	0	1
45	cb444df2-d3db-412f-86ff-716dce8027ff	2021-06-21 01:03:46.481	2021-06-21 01:03:46.488	Ali	Mohamed	MALE	C2BoYtkIDa9P4Se	Dakota_Hermann@hotmail.com	3	/static/images/avatars/avatar_5.png	1	5	2	student	4	4	0	1
46	6f5638be-c223-4807-a35f-5ed7fd1b02f8	2021-06-21 01:03:46.481	2021-06-21 01:03:46.488	Mohamed	Abdelrahman	MALE	6a3ycYLHBOxOEWY	Anabelle_Sanford72@yahoo.com	4	/static/images/avatars/avatar_4.png	2	4	8	student	4	4	0	1
47	49818bec-31ae-4648-b5d7-287c5543f582	2021-06-21 01:03:46.481	2021-06-21 01:03:46.488	Ahmed	Hosni	MALE	x8xR5mMPCPAwO2r	Elissa40@yahoo.com	3	/static/images/avatars/avatar_4.png	3	4	3	student	4	4	0	1
48	70e9068a-4967-4929-b9fe-a47f214fec69	2021-06-21 01:03:46.481	2021-06-21 01:03:46.488	Hussin	Omar	MALE	qJxRVsAC3MsXjHf	Breanne.Abshire87@hotmail.com	4	/static/images/avatars/avatar_6.png	3	4	9	student	4	4	0	1
49	04c23fef-5c60-40d6-a8ad-c54c9cf2fba8	2021-06-21 01:03:46.481	2021-06-21 01:03:46.488	Mohamed	Sameh	MALE	qeu57xcm5FLaqY_	Birdie.Torphy10@gmail.com	2	/static/images/avatars/avatar_5.png	2	4	9	student	4	4	0	1
50	c7072c05-f232-4b9f-8706-7ae95db9e41e	2021-06-21 01:03:46.481	2021-06-21 01:03:46.488	Ali	Hosni	MALE	PWVEREa7DXTjYRc	Krista32@gmail.com	2	/static/images/avatars/avatar_6.png	1	5	8	student	4	4	0	1
51	9e202955-bc6b-4bcc-a9b0-ffd0745f5ee9	2021-06-21 01:03:46.482	2021-06-21 01:03:46.488	Ali	Ahmed	MALE	2fvjapeUPtCkhjm	Buddy38@hotmail.com	2	/static/images/avatars/avatar_5.png	1	4	7	student	4	4	0	1
52	b5bb7802-cc61-429c-a5b0-93d9a99b7190	2021-06-21 01:03:46.482	2021-06-21 01:03:46.488	Kamal	Karim	MALE	GKoy2tO2g4rvGoK	Amara23@hotmail.com	2	/static/images/avatars/avatar_6.png	2	5	9	student	4	4	0	1
53	bc72be12-9cdb-461f-9e7a-84fc5213279f	2021-06-21 01:03:46.482	2021-06-21 01:03:46.488	Hosni	Mohamed	MALE	nnooBXBNw4tqm5F	Ford.Torphy30@gmail.com	3	/static/images/avatars/avatar_4.png	3	4	2	student	4	4	0	1
54	ab662291-1648-43e3-852c-f45a18378db3	2021-06-21 01:03:46.482	2021-06-21 01:03:46.488	Mohamed	Omar	MALE	XBVmrffqWCKbHfS	Cleo60@gmail.com	1	/static/images/avatars/avatar_4.png	1	4	10	student	4	4	0	1
55	b92d4528-63b7-4597-86a5-b03817496ee7	2021-06-21 01:03:46.482	2021-06-21 01:03:46.488	Ali	Sameh	MALE	QcKdqhq8CUPi63L	Cary_Cruickshank52@yahoo.com	7	/static/images/avatars/avatar_5.png	1	5	4	student	4	4	0	1
56	502687c4-1357-499c-9a6c-64f12fec996c	2021-06-21 01:03:46.482	2021-06-21 01:03:46.488	Ali	Karim	MALE	Zvi1nRPhMJGA6cg	Hank99@gmail.com	3	/static/images/avatars/avatar_4.png	2	4	1	student	4	4	0	1
57	da5a35c5-3ea2-45d9-b740-2434e8ed102c	2021-06-21 01:03:46.482	2021-06-21 01:03:46.488	Abdelrahman	Mohamed	MALE	JReQ97CsvfotMG4	Stephany32@yahoo.com	6	/static/images/avatars/avatar_5.png	1	5	5	student	4	4	0	1
58	1a6f472b-a2d1-4b58-a3e3-592634e9350c	2021-06-21 01:03:46.482	2021-06-21 01:03:46.488	Kamal	Ali	MALE	qtGOBDPGjfsLCZH	Vergie_Beer@hotmail.com	8	/static/images/avatars/avatar_5.png	3	5	2	student	4	4	0	1
59	5ea4a110-8e30-4b57-bff3-ef8ec9777835	2021-06-21 01:03:46.483	2021-06-21 01:03:46.488	Kamal	Mohamed	MALE	M_mV2QcgWKz1qyu	Jaylin79@hotmail.com	4	/static/images/avatars/avatar_6.png	2	4	4	student	4	4	0	1
60	7e2e67bf-d149-445c-bf87-b4b8f49f906d	2021-06-21 01:03:46.483	2021-06-21 01:03:46.488	Hosni	Kamal	MALE	QeH5IMoMdFJtbS8	Demetrius.Kovacek@hotmail.com	10	/static/images/avatars/avatar_6.png	1	4	7	student	4	4	0	1
61	c472d362-6e52-4270-b256-0fca01697f41	2021-06-21 01:03:46.483	2021-06-21 01:03:46.488	Karim	Karim	MALE	IKUC7c97MLinVoh	Callie.DuBuque25@gmail.com	3	/static/images/avatars/avatar_5.png	2	4	3	student	4	4	0	1
62	56bfd582-2b07-4817-a91d-6310583c3b29	2021-06-21 01:03:46.483	2021-06-21 01:03:46.488	Ahmed	Omar	MALE	5JT027gunP2meKM	Velva.Weimann@yahoo.com	8	/static/images/avatars/avatar_5.png	3	4	9	student	4	4	0	1
63	fb376ec6-7c8e-43a6-9286-b8ae73da8cc1	2021-06-21 01:03:46.483	2021-06-21 01:03:46.488	Hosni	Mohamed	MALE	Bw_992hOBvXUDKv	Linwood82@yahoo.com	9	/static/images/avatars/avatar_5.png	1	4	10	student	4	4	0	1
64	4c70fbde-28b5-4c5e-b8bb-60b76eeee5c9	2021-06-21 01:03:46.483	2021-06-21 01:03:46.488	Ahmed	Ali	MALE	HuzAhvPk70Ta9q2	Carmella69@hotmail.com	8	/static/images/avatars/avatar_5.png	1	4	4	student	4	4	0	1
65	07fcb142-fa6c-44f1-a647-5b7460a71b9c	2021-06-21 01:03:46.483	2021-06-21 01:03:46.488	Hussin	Abdelrahman	MALE	6KbdCRMRARXd2Ao	Jaren.Parker97@gmail.com	9	/static/images/avatars/avatar_4.png	1	5	10	student	4	4	0	1
66	7ebc16b4-1245-481a-bc67-a006d032aca7	2021-06-21 01:03:46.483	2021-06-21 01:03:46.488	Mohamed	Ahmed	MALE	DmhxVEzfr2hDXsz	Jett.Bayer75@hotmail.com	1	/static/images/avatars/avatar_4.png	2	5	6	student	4	4	0	1
67	4808f46d-4494-4476-ac6f-2a51f95ece46	2021-06-21 01:03:46.483	2021-06-21 01:03:46.488	Abdelrahman	Kamal	MALE	VGWjaLbB6K8V7Uz	Skylar_McDermott19@gmail.com	3	/static/images/avatars/avatar_6.png	1	5	7	student	4	4	0	1
68	abc9d262-7447-4205-9c7a-527d5648aea5	2021-06-21 01:03:46.484	2021-06-21 01:03:46.488	Abdelrahman	Omar	MALE	cdRxJzHEdivT9m_	Dasia63@gmail.com	7	/static/images/avatars/avatar_4.png	1	5	2	student	4	4	0	1
69	f634c1eb-8623-4ae3-9406-8525bfc17f6f	2021-06-21 01:03:46.484	2021-06-21 01:03:46.488	Kamal	Ali	MALE	OvEnZYgJzTifAff	Oceane54@gmail.com	6	/static/images/avatars/avatar_5.png	2	5	7	student	4	4	0	1
70	018497b1-f3c7-49bd-89fd-3bfbbc03b64b	2021-06-21 01:03:46.484	2021-06-21 01:03:46.488	Hussin	Kamal	MALE	mSwSJz9asTdyXDj	Eldora.Feeney@gmail.com	10	/static/images/avatars/avatar_6.png	2	5	5	student	4	4	0	1
71	ab7c94a6-4c4b-4e18-93f8-1d5f0ee3f75b	2021-06-21 01:03:46.484	2021-06-21 01:03:46.488	Karim	Kamal	MALE	cacDNVlUWoasXei	Dolly82@gmail.com	1	/static/images/avatars/avatar_5.png	3	5	7	student	4	4	0	1
72	609ae855-9514-4d65-8251-a175042d28c7	2021-06-21 01:03:46.484	2021-06-21 01:03:46.488	Ali	Mahmoud	MALE	n7PdXfMR2bGwUY4	Dorothy_Davis51@gmail.com	8	/static/images/avatars/avatar_5.png	2	4	3	student	4	4	0	1
73	d95ea9a3-7aca-4b4a-ba94-8730596ea8b3	2021-06-21 01:03:46.484	2021-06-21 01:03:46.488	Mahmoud	Sameh	MALE	CRlEmYdjWCrhWng	Alphonso_Cremin@gmail.com	1	/static/images/avatars/avatar_4.png	1	5	6	student	4	4	0	1
74	2fbe3c04-cd4f-44c7-8dad-055e0bf02d41	2021-06-21 01:03:46.484	2021-06-21 01:03:46.488	Ali	Hosni	MALE	y4YNyjVGq0SA4_m	Tyler81@gmail.com	8	/static/images/avatars/avatar_4.png	1	4	4	student	4	4	0	1
75	0b92dee2-f68c-410b-83da-7c78daaf2391	2021-06-21 01:03:46.484	2021-06-21 01:03:46.488	Mohamed	Hosni	MALE	Kj7J3ciXwGDh0Ku	Nova93@hotmail.com	3	/static/images/avatars/avatar_6.png	2	4	2	student	4	4	0	1
76	8d52c333-6a56-453b-92f2-bca45e28b7b7	2021-06-21 01:03:46.484	2021-06-21 01:03:46.488	Hosni	Mohamed	MALE	w5AgJYCuddT8BGN	Kevin.Olson@gmail.com	3	/static/images/avatars/avatar_4.png	2	4	9	student	4	4	0	1
77	3d6afaf9-acd6-46a2-b715-af5595a53782	2021-06-21 01:03:46.485	2021-06-21 01:03:46.488	Mahmoud	Ali	MALE	Q1tcT76oOlFBKs1	Maureen21@yahoo.com	1	/static/images/avatars/avatar_4.png	2	4	1	student	4	4	0	1
78	dffd3783-eafc-49c0-bdce-25ee780a20df	2021-06-21 01:03:46.485	2021-06-21 01:03:46.488	Hosni	Ali	MALE	Cniqob7230AH1ly	Sheila86@hotmail.com	5	/static/images/avatars/avatar_4.png	2	5	8	student	4	4	0	1
79	2088629f-f872-4c9c-b09a-0b1ba9bac02f	2021-06-21 01:03:46.485	2021-06-21 01:03:46.488	Kamal	Mahmoud	MALE	p_ZXvo7IElHrmKX	Jayme_Macejkovic74@yahoo.com	4	/static/images/avatars/avatar_6.png	3	5	3	student	4	4	0	1
80	e577f472-1d22-4090-b3bd-89bcf37dca3a	2021-06-21 01:03:46.485	2021-06-21 01:03:46.488	Hussin	Abdelrahman	MALE	qLQI5E9pwG8EC2U	Jamarcus50@gmail.com	2	/static/images/avatars/avatar_6.png	3	5	9	student	4	4	0	1
81	f5c98144-d8b0-46f0-a352-97cd0e084ab9	2021-06-21 01:03:46.485	2021-06-21 01:03:46.488	Mohamed	Ahmed	MALE	uYIOTohPMdRgGh8	Leif.Roberts@gmail.com	8	/static/images/avatars/avatar_4.png	3	5	4	student	4	4	0	1
82	b9961371-9f1f-4d2c-b3e3-f01cafa1e61a	2021-06-21 01:03:46.485	2021-06-21 01:03:46.488	Karim	Abdelrahman	MALE	I9v_rOYM5PQlU44	Marina_Durgan81@hotmail.com	4	/static/images/avatars/avatar_6.png	2	4	5	student	4	4	0	1
83	80dd7069-5ca4-482a-a9f4-c8d5880a4f6f	2021-06-21 01:03:46.485	2021-06-21 01:03:46.489	Karim	Mahmoud	MALE	vdzcNL6sSzKdJ6c	Georgiana35@hotmail.com	4	/static/images/avatars/avatar_6.png	2	4	8	student	4	4	0	1
84	cbf57982-6599-4ffc-9576-7dbdba3f50e7	2021-06-21 01:03:46.485	2021-06-21 01:03:46.489	Mohamed	Hosni	MALE	LgJ2gZVP1hKgTDf	Annette_Morissette34@yahoo.com	2	/static/images/avatars/avatar_6.png	2	4	5	student	4	4	0	1
85	df012c6b-40e7-48d9-acc1-585fad44ceca	2021-06-21 01:03:46.486	2021-06-21 01:03:46.489	Mahmoud	Sameh	MALE	pYuUFe_Oqao9ffZ	Kaci.Braun68@gmail.com	7	/static/images/avatars/avatar_5.png	3	5	10	student	4	4	0	1
86	5d704f12-9d0b-4d9d-abde-f83707408a43	2021-06-21 01:03:46.486	2021-06-21 01:03:46.489	Ali	Abdelrahman	MALE	yHv_O8rkOYCDc7w	Mateo.Cartwright@yahoo.com	8	/static/images/avatars/avatar_5.png	1	4	1	student	4	4	0	1
87	e3effe62-dc2e-4cf1-894b-ad4b72c8fbd5	2021-06-21 01:03:46.486	2021-06-21 01:03:46.489	Ali	Karim	MALE	_AyF_jKGEYzb46e	Shyann.Stokes@yahoo.com	3	/static/images/avatars/avatar_4.png	1	4	1	student	4	4	0	1
88	e5be09bf-9d0f-4f45-b518-6f68854281bd	2021-06-21 01:03:46.486	2021-06-21 01:03:46.489	Hosni	Hosni	MALE	s1Fw4GVIYlUoYf6	Napoleon_Kling@yahoo.com	6	/static/images/avatars/avatar_5.png	2	4	10	student	4	4	0	1
89	2f529f0e-ba14-4655-8882-160b162a2d03	2021-06-21 01:03:46.486	2021-06-21 01:03:46.489	Karim	Hussin	MALE	UaHnjWSlA_EPde2	Quincy.Macejkovic72@yahoo.com	6	/static/images/avatars/avatar_5.png	3	5	8	student	4	4	0	1
90	ab0f68cf-4b31-4136-a7f2-823388505071	2021-06-21 01:03:46.486	2021-06-21 01:03:46.489	Hosni	Hussin	MALE	gzArO09F6wY2dOK	Oleta.Langosh86@gmail.com	2	/static/images/avatars/avatar_5.png	1	4	1	student	4	4	0	1
91	78a12364-c779-4edc-9629-0d63b4a51e29	2021-06-21 01:03:46.486	2021-06-21 01:03:46.489	Kamal	Mohamed	MALE	Wme9KwvqPJhsrxw	Micah_Cronin92@hotmail.com	5	/static/images/avatars/avatar_6.png	2	5	6	student	4	4	0	1
92	10108d83-4b2c-4dbf-a005-ae24d5f33daf	2021-06-21 01:03:46.486	2021-06-21 01:03:46.489	Abdelrahman	Hosni	MALE	FVxxEXinuUJ5gZk	Haylee_Hessel91@gmail.com	7	/static/images/avatars/avatar_5.png	3	4	1	student	4	4	0	1
93	5ac7c133-8c82-4fd7-a94f-62aa53549bfb	2021-06-21 01:03:46.486	2021-06-21 01:03:46.489	Kamal	Sameh	MALE	z3IpSmTLgyjOjRz	Cecelia38@yahoo.com	9	/static/images/avatars/avatar_4.png	3	5	7	student	4	4	0	1
94	d6955aa6-88b0-4642-a780-9cb19b1a799d	2021-06-21 01:03:46.487	2021-06-21 01:03:46.489	Abdelrahman	Karim	MALE	2F_vl6aE0EieUDT	Brycen_Corkery@yahoo.com	1	/static/images/avatars/avatar_4.png	2	5	1	student	4	4	0	1
95	f4425924-6267-45a2-ac36-fe73280fff78	2021-06-21 01:03:46.487	2021-06-21 01:03:46.489	Mahmoud	Mahmoud	MALE	yCiLV_RgLv6dQS2	Donato.Wehner72@hotmail.com	8	/static/images/avatars/avatar_4.png	3	5	9	student	4	4	0	1
96	a080701f-52ce-451a-9a74-1ee7750dfa66	2021-06-21 01:03:46.487	2021-06-21 01:03:46.489	Karim	Sameh	MALE	Lwa5QMUs3gPetAk	Fae53@yahoo.com	10	/static/images/avatars/avatar_6.png	3	5	4	student	4	4	0	1
97	9b60fe41-915a-417f-8e33-8d2c42497f33	2021-06-21 01:03:46.487	2021-06-21 01:03:46.489	Ali	Mohamed	MALE	qIFRE48x06xXjtl	Tania11@hotmail.com	6	/static/images/avatars/avatar_4.png	2	4	2	student	4	4	0	1
98	a72a2069-7539-447e-9646-af87612477a6	2021-06-21 01:03:46.487	2021-06-21 01:03:46.489	Abdelrahman	Ali	MALE	4XLA3pIKgatvAUn	Sonya46@gmail.com	3	/static/images/avatars/avatar_5.png	3	4	1	student	4	4	0	1
99	e661a4c1-b40b-48f8-b680-becbb33457ca	2021-06-21 01:03:46.487	2021-06-21 01:03:46.489	Hussin	Ali	MALE	0h0A9EYIzKIcCac	Rachael.Rowe7@gmail.com	9	/static/images/avatars/avatar_4.png	1	4	3	student	4	4	0	1
100	c8eec2dc-cf32-486e-8844-a96791dac83e	2021-06-21 01:03:46.487	2021-06-21 01:03:46.489	Sameh	Sameh	MALE	Pr1gbFD8A0RveAF	Christy_Goldner@yahoo.com	4	/static/images/avatars/avatar_5.png	3	5	9	student	4	4	0	1
101	6583be8f-04f6-40ba-ae72-8e9376c3b796	2021-07-03 21:18:21.877	1970-01-01 00:00:00	test	test	MALE	fdfd	test@gmail.com	1	/static/images/avatars/avatar_4	\N	\N	1	student	4	4	0	1
102	113ddde7-f14b-4108-934e-3057e35b4aaa	2021-07-04 16:20:00.76	2021-07-04 16:20:00.761	test	test	MALE	9_UaRTOAzwi2kiA	testtest@yahoo.com	9	/static/images/avatars/avatar_4	\N	\N	1	student	4	4	0	1
1	5c1212a5-5599-4d43-adff-f9b34df42b21	2021-06-21 01:03:46.474	2021-07-04 20:27:18.508	Ali	Sameh	MALE	0b7Ce0tZKxqnIEx	Isabell_Altenwerth96@gmail.com	9	/static/images/avatars/avatar_4.png	2	3	1	student	4	4	0	1
\.


--
-- Data for Name: StudentSemester; Type: TABLE DATA; Schema: public; Owner: abosamra
--

COPY public."StudentSemester" ("createdAt", "updatedAt", "studentId", "semesterId", "semesterGPA", "creditDone", "creditHave") FROM stdin;
\.


--
-- Data for Name: Supervisor; Type: TABLE DATA; Schema: public; Owner: abosamra
--

COPY public."Supervisor" (id, "createdAt", "updatedAt", fname, lname, gender, password, email, phone, avatar, "coordinatorId", role) FROM stdin;
1	2021-06-21 01:03:46.447	2021-06-21 01:03:46.449	Hosni	Kamal	MALE	iO21kYpmrHOm4B8	Marielle5@yahoo.com	1-742-693-7025	/static/images/avatars/avatar_3.png	5	supervisor
2	2021-06-21 01:03:46.448	2021-06-21 01:03:46.449	Ahmed	Ahmed	MALE	6It3zJJmxGa1uYe	Joanie_Keebler@hotmail.com	1-454-834-6956 x6087	/static/images/avatars/avatar_0.png	8	supervisor
3	2021-06-21 01:03:46.448	2021-06-21 01:03:46.449	Mahmoud	Ali	MALE	_w2nVRDgCD46eUb	Richie_Reichel@hotmail.com	822.258.7285	/static/images/avatars/avatar_2.png	4	supervisor
4	2021-06-21 01:03:46.448	2021-06-21 01:03:46.449	Ahmed	Ahmed	MALE	9Qs2HZSUMccoM0r	Wilton16@hotmail.com	873.803.1163	/static/images/avatars/avatar_0.png	2	supervisor
5	2021-06-21 01:03:46.448	2021-06-21 01:03:46.449	Kamal	Karim	MALE	B07_dJ5sTjcQxLN	Melany.Brown13@hotmail.com	971.501.6995 x637	/static/images/avatars/avatar_3.png	1	supervisor
6	2021-06-21 01:03:46.448	2021-06-21 01:03:46.449	Hosni	Mohamed	MALE	MupTfT6VldBb_4C	Shaun.Macejkovic4@gmail.com	467.908.9484	/static/images/avatars/avatar_2.png	7	supervisor
7	2021-06-21 01:03:46.448	2021-06-21 01:03:46.449	Ahmed	Abdelrahman	MALE	i6VX02bAD17bftY	Augustus.Gutmann@yahoo.com	278.273.0327	/static/images/avatars/avatar_3.png	7	supervisor
8	2021-06-21 01:03:46.448	2021-06-21 01:03:46.449	Kamal	Mahmoud	MALE	gKmakHc71_bPew0	Naomi89@yahoo.com	644.861.2148	/static/images/avatars/avatar_1.png	1	supervisor
9	2021-06-21 01:03:46.448	2021-06-21 01:03:46.449	Ahmed	Mahmoud	MALE	OXxslUjkAn7Fv60	Emmalee.Fahey99@yahoo.com	1-212-824-3540 x9248	/static/images/avatars/avatar_1.png	9	supervisor
10	2021-06-21 01:03:46.448	2021-06-21 01:03:46.449	Mohamed	Omar	MALE	K8OgjmJydyXfvuj	Vanessa94@yahoo.com	1-520-333-2401	/static/images/avatars/avatar_1.png	7	supervisor
\.


--
-- Data for Name: _CoursePrerequisites; Type: TABLE DATA; Schema: public; Owner: abosamra
--

COPY public."_CoursePrerequisites" ("A", "B") FROM stdin;
1	2
2	3
4	10
13	18
14	20
13	23
20	24
25	26
13	27
19	28
17	29
13	30
13	31
27	33
27	34
27	35
27	36
35	37
27	38
27	39
27	40
15	43
22	44
14	45
22	46
22	48
14	49
44	49
44	50
51	52
30	54
30	55
55	56
55	57
54	57
55	58
54	58
61	62
20	63
20	64
24	65
24	66
20	67
64	70
71	72
26	73
25	74
25	75
75	76
75	77
75	78
25	79
77	80
81	82
\.


--
-- Data for Name: _CourseToSemester; Type: TABLE DATA; Schema: public; Owner: abosamra
--

COPY public."_CourseToSemester" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: abosamra
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
03624aa8-8420-42db-a861-c48c4e4ac615	039872cf54c0651259532e26484c72f1db89bdf9480d9380f238f17496575658	2021-06-21 03:03:44.094719+02	20210529130750_fixnotifications	\N	\N	2021-06-21 03:03:44.019667+02	1
e2ff1543-da6c-4e08-9001-a81563f85808	5d0a1dbe3c7f8dee91c412286bad3a0a434fab62f6e3571f2b6b96f5bb0671e1	2021-06-21 03:03:42.893089+02	20210415233134_init	\N	\N	2021-06-21 03:03:42.62701+02	1
8305f962-e263-482f-b644-4fccaafd5daf	4a31511c4dc25ac8d32f234b454ac08b9c2dbe75cb5fd23c99a8c3cbd34f6b39	2021-06-21 03:03:43.293986+02	20210418005159_first	\N	\N	2021-06-21 03:03:42.901637+02	1
a3ca845d-1620-4165-83fe-491e50747263	adb9e45c3fb68efc83ab56ec3fd2958c99accbb416ec196df5158a2606d47ed8	2021-06-21 03:03:43.360541+02	20210418024452_second	\N	\N	2021-06-21 03:03:43.302385+02	1
fc094eef-d88c-41e3-9fa6-1d0f01fe0d88	ab94903ba2bbb1671e930f6f98a29652621f9cdb8d1f89d81236934674430359	2021-06-21 03:03:44.20326+02	20210601084916_add_major	\N	\N	2021-06-21 03:03:44.10326+02	1
360a86c6-5aa2-40fa-ae15-722b40771014	f94dbd675f3fe87ddb40688c50b4f4273c3d434251f63b8d928b79bf39d843c5	2021-06-21 03:03:43.418962+02	20210503052956_add_gpa	\N	\N	2021-06-21 03:03:43.368997+02	1
c6761130-21b9-4569-ad1a-08cb2e808324	6073ce0556e320dbcd27ad751d2ed5e50838cfd1ee9ffdbd37d378c1fbd6dcd2	2021-06-21 03:03:43.452285+02	20210503053431_add_mis	\N	\N	2021-06-21 03:03:43.427351+02	1
54867973-ef5a-49e6-a26e-a91e1851a7c1	cb720737207a1084b8acd3df87de5d952c5fd43857622e8694cdbcaa9fba7fac	2021-06-21 03:03:43.485943+02	20210503055655_add_level	\N	\N	2021-06-21 03:03:43.460733+02	1
84a31f54-8a3e-4fed-94e5-5db3671922ee	6253a1cce740e7ef549cb4f4fc9907c744540886ea01271ee98c3d2c1433dfb6	2021-06-21 03:03:44.328498+02	20210619225039_addcoordinator	\N	\N	2021-06-21 03:03:44.211737+02	1
7b9bedd6-196c-4119-a3b0-4f11a9306e31	ac3e1dd7c3758b7e80b2955f3aeb76630bd57b9e369d46c3845f353de6d1e9c4	2021-06-21 03:03:43.619097+02	20210503055802_addgpafloat	\N	\N	2021-06-21 03:03:43.494349+02	1
c4106b1e-a6e3-4fba-9736-500012b5a7ac	5f385757cf338bbfe98374eff6fd2e9903f1524c2c05d4943b045ad21ec6c45a	2021-06-21 03:03:43.710934+02	20210504025726_addfinishedcourses	\N	\N	2021-06-21 03:03:43.627583+02	1
46bef6e2-4c58-4155-a99e-de14118bf876	0ba7aaa4b4b9f2a058450247ba6119b2a9e6dfa0c9efd0bcb1fd7330de768b82	2021-06-21 03:03:43.744334+02	20210504231028_adddefaultpassword	\N	\N	2021-06-21 03:03:43.719355+02	1
27033ed0-1120-49f7-b626-8421d55cdbdb	d338778b4db2af1e4f6fe72530734db0c85dd63978c49024ad982e4825d7d0be	2021-06-21 03:03:44.36182+02	20210620002951_addrole	\N	\N	2021-06-21 03:03:44.336958+02	1
e3db72d5-dd67-4c57-9292-98dedbf7d55d	64cc4b3ebfc65c9205acc03da7a662c88f68f9fed1d6bf46aa5265135d7fb651	2021-06-21 03:03:43.777578+02	20210505031559_optionalpassword	\N	\N	2021-06-21 03:03:43.752685+02	1
a177c9a7-57d0-4c4c-b55d-55a9493f2906	61c609d51929becff204aa98543acf8e055023d8f3529d8be30bd2d1b723730a	2021-06-21 03:03:43.835896+02	20210511163132_coursecodeunique	\N	\N	2021-06-21 03:03:43.785946+02	1
f2d396b3-abcc-431d-bfb1-416c9c89299c	b1830e1f9afb69ea7a61d8dd4af8ce3a587c0a12cdde7608254677f9e9439434	2021-06-21 03:03:43.927754+02	20210520032319_idforfinishedcourses	\N	\N	2021-06-21 03:03:43.844291+02	1
343bb6fd-e330-43fc-b597-ff755ad93ef2	691ee83d23342a36449c78eb97953b7b1de1a8113c4386e6e9fe891e58bc9e89	2021-06-21 03:03:44.395163+02	20210620202458_addtypeforcourse	\N	\N	2021-06-21 03:03:44.370234+02	1
a52a523f-9e87-411f-a393-cc0f75301b42	5d3783e2256b0dcf3969151bb11a6261311ad21b272d95e54936d55520f7bc02	2021-06-21 03:03:44.011205+02	20210529121638_addnotifications	\N	\N	2021-06-21 03:03:43.936204+02	1
cb80b2a6-b17e-4609-a9c6-0694db86cbd2	99f8d81a054a37ef99aa630484a774dbf649c866b9bb163f654691e7e419a8be	2021-06-21 03:03:44.428577+02	20210620204048_add_type_enum	\N	\N	2021-06-21 03:03:44.403624+02	1
6cb8e99a-7ca6-46cb-9ff1-f317f96c5b9e	9b55aab63e9efaf95ea8aca556f4ad982d1b5ca0085e3d24e946ef8712f1c6a5	2021-06-21 03:03:44.595412+02	20210621005249_adddefaults	\N	\N	2021-06-21 03:03:44.436974+02	1
b3f10482-cb93-4964-a419-feb8e080908f	a860d70fd4c8b96aeeb19978159ff1165aabbe17360749b893a216705e0ab619	2021-06-21 03:33:06.171006+02	20210621013306_adduniversityelective	\N	\N	2021-06-21 03:33:06.144751+02	1
72de7dd2-683a-48c4-85dc-c29f49fff421	f8443daf979127a0ddf471d2c0aaea5e4a1513d451c2bd1f6c1d89d6d97df747	2021-07-01 17:36:23.088701+02	20210701153622_addsemester	\N	\N	2021-07-01 17:36:22.788406+02	1
398d79ea-178e-47bd-8273-df550c6aefaf	0957c62498ddedd65b146416a7eaddb22b393e028864ad8b2071c75091201a81	2021-07-03 15:12:12.665488+02	20210703131212_add_credit_tofinishedcourses	\N	\N	2021-07-03 15:12:12.584847+02	1
b523f515-1511-4405-961d-71d6a688c627	a5672239d0990f0063151ed5ce5309e266e70388c6c2fa2f0d98c79218828098	2021-07-01 19:00:28.504144+02	20210701170028_addstudentsemester	\N	\N	2021-07-01 19:00:28.413955+02	1
0dc4f469-bafc-476f-8890-cb7644e81c2c	8af5874385e6f051d08e368e1e3bc5e001bb9f61edd0beca4abbc57df7ee6def	2021-07-01 21:14:18.673902+02	20210701191418_addstudentsemester2	\N	\N	2021-07-01 21:14:18.591113+02	1
4d0f85fd-00d3-4661-a8a7-51ba813041cf	8a331ec4485c4c87c843c98d4493b582252ee12e7d17723b70fb99944f34d1d1	2021-07-04 21:13:03.797745+02	20210704191303_add_student_credit_done	\N	\N	2021-07-04 21:13:03.77052+02	1
7fe64f7d-ae9e-400e-8ed5-625d25ea5e28	aa42776bae7c167cf38aa575bc88a58b2ae905645109b8bdbb2d11c3972e5e73	2021-07-02 16:31:42.692236+02	20210702143142_numerical_gpa	\N	\N	2021-07-02 16:31:42.627487+02	1
faffc937-0530-4c30-b219-7a67ce5b7a1b	8f67b4623e46d205337156212659843b84615b3dff55c85ba8e741d19055d159	2021-07-03 16:07:51.611339+02	20210703140751_add_enrollmentsto_semesters	\N	\N	2021-07-03 16:07:51.459085+02	1
cd1db5c1-f125-4bf2-85b0-a8062c0c27d0	1b09f6e351de06d9eb63fbaccb196b8012e58401c65f59edc4e4813e9b58dd00	2021-07-02 16:33:30.617137+02	20210702143330_numerical_gpafloat	\N	\N	2021-07-02 16:33:30.586624+02	1
9d970070-2495-482b-a61e-12a13335d7b0	7bb358d0adea84994164c64cf576172ad4d3e1471b7c3483f8072b688acd01b5	2021-07-03 00:51:39.79633+02	20210702225139_add_credit_to_enrollment	\N	\N	2021-07-03 00:51:39.766929+02	1
d6e5f139-60be-4988-8674-562be26238bc	2524dc4bfb8d482f00f6df23ca1f64f570069d8655af1c528351252ef560ca44	2021-07-04 17:55:52.844277+02	20210704155552_addinstructorrelation	\N	\N	2021-07-04 17:55:52.696235+02	1
07ab4818-b006-4803-9217-35dd8a21469a	ae41e26cb9047bc2b0d3da2edaa0e6046336dc2346074b13bda936128a9524a7	2021-07-04 00:49:12.969587+02	20210703224912_addclosedstatusforsemester	\N	\N	2021-07-04 00:49:12.895356+02	1
097e4f2a-b209-492b-8301-1c2350e42d72	2d434442d5a3a4ffcdced5d6e44c03b4ce179ae3f13c5b99605a01ac30d7246b	2021-07-04 16:49:57.528157+02	20210704144957_defaultsemester_gpa_initial	\N	\N	2021-07-04 16:49:57.47245+02	1
087af622-b5f5-4110-93be-1ea604a6dbf6	d38cce4dd2499122e219bad6ff76c9cf70ec11331712b0e61a8e6e5e939d15fd	2021-07-04 21:12:21.553655+02	20210704191221_removestudent_credit_have	\N	\N	2021-07-04 21:12:21.518184+02	1
c2afa1a7-7830-481a-b229-ff1f85e9ada3	91f5dbb7f6c6922b5add01f96badfe0adf88a73ec09858ba5be727c8f745ce30	2021-07-04 22:20:07.280289+02	20210704202007_resetlevel	\N	\N	2021-07-04 22:20:07.251935+02	1
7bdd3dbc-0603-4a1e-8940-2b5dd770f1cc	6184e3baf8f250016757f0a4634afb75bc43299a7a36143b062c43924cfa1726	2021-07-04 22:04:04.731858+02	20210704200404_remove_gpa	\N	\N	2021-07-04 22:04:04.703831+02	1
20bd336d-d34b-4154-b10e-8f9be2870100	d862919440ba84f25de5895150e0a581415a2537080fd91504d49473a0587251	2021-07-04 22:20:48.80141+02	20210704202048_resetlevel2	\N	\N	2021-07-04 22:20:48.774547+02	1
\.


--
-- Name: Coordinator_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abosamra
--

SELECT pg_catalog.setval('public."Coordinator_id_seq"', 10, true);


--
-- Name: Course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abosamra
--

SELECT pg_catalog.setval('public."Course_id_seq"', 83, true);


--
-- Name: Enrollment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abosamra
--

SELECT pg_catalog.setval('public."Enrollment_id_seq"', 39, true);


--
-- Name: FinishedCourses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abosamra
--

SELECT pg_catalog.setval('public."FinishedCourses_id_seq"', 25, true);


--
-- Name: Major_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abosamra
--

SELECT pg_catalog.setval('public."Major_id_seq"', 5, true);


--
-- Name: Notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abosamra
--

SELECT pg_catalog.setval('public."Notifications_id_seq"', 79, true);


--
-- Name: Semester_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abosamra
--

SELECT pg_catalog.setval('public."Semester_id_seq"', 9, true);


--
-- Name: Student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abosamra
--

SELECT pg_catalog.setval('public."Student_id_seq"', 102, true);


--
-- Name: Supervisor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abosamra
--

SELECT pg_catalog.setval('public."Supervisor_id_seq"', 10, true);


--
-- Name: Coordinator Coordinator_pkey; Type: CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Coordinator"
    ADD CONSTRAINT "Coordinator_pkey" PRIMARY KEY (id);


--
-- Name: Course Course_pkey; Type: CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (id);


--
-- Name: Enrollment Enrollment_pkey; Type: CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_pkey" PRIMARY KEY (id);


--
-- Name: FinishedCourses FinishedCourses_pkey; Type: CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."FinishedCourses"
    ADD CONSTRAINT "FinishedCourses_pkey" PRIMARY KEY (id);


--
-- Name: Major Major_pkey; Type: CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Major"
    ADD CONSTRAINT "Major_pkey" PRIMARY KEY (id);


--
-- Name: Notifications Notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_pkey" PRIMARY KEY (id);


--
-- Name: Semester Semester_pkey; Type: CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Semester"
    ADD CONSTRAINT "Semester_pkey" PRIMARY KEY (id);


--
-- Name: StudentSemester StudentSemester_pkey; Type: CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."StudentSemester"
    ADD CONSTRAINT "StudentSemester_pkey" PRIMARY KEY ("studentId", "semesterId");


--
-- Name: Student Student_pkey; Type: CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY (id);


--
-- Name: Supervisor Supervisor_pkey; Type: CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Supervisor"
    ADD CONSTRAINT "Supervisor_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Coordinator.email_unique; Type: INDEX; Schema: public; Owner: abosamra
--

CREATE UNIQUE INDEX "Coordinator.email_unique" ON public."Coordinator" USING btree (email);


--
-- Name: Major.code_unique; Type: INDEX; Schema: public; Owner: abosamra
--

CREATE UNIQUE INDEX "Major.code_unique" ON public."Major" USING btree (code);


--
-- Name: Student.email_unique; Type: INDEX; Schema: public; Owner: abosamra
--

CREATE UNIQUE INDEX "Student.email_unique" ON public."Student" USING btree (email);


--
-- Name: Student.uniCode_unique; Type: INDEX; Schema: public; Owner: abosamra
--

CREATE UNIQUE INDEX "Student.uniCode_unique" ON public."Student" USING btree ("uniCode");


--
-- Name: Supervisor.email_unique; Type: INDEX; Schema: public; Owner: abosamra
--

CREATE UNIQUE INDEX "Supervisor.email_unique" ON public."Supervisor" USING btree (email);


--
-- Name: _CoursePrerequisites_AB_unique; Type: INDEX; Schema: public; Owner: abosamra
--

CREATE UNIQUE INDEX "_CoursePrerequisites_AB_unique" ON public."_CoursePrerequisites" USING btree ("A", "B");


--
-- Name: _CoursePrerequisites_B_index; Type: INDEX; Schema: public; Owner: abosamra
--

CREATE INDEX "_CoursePrerequisites_B_index" ON public."_CoursePrerequisites" USING btree ("B");


--
-- Name: _CourseToSemester_AB_unique; Type: INDEX; Schema: public; Owner: abosamra
--

CREATE UNIQUE INDEX "_CourseToSemester_AB_unique" ON public."_CourseToSemester" USING btree ("A", "B");


--
-- Name: _CourseToSemester_B_index; Type: INDEX; Schema: public; Owner: abosamra
--

CREATE INDEX "_CourseToSemester_B_index" ON public."_CourseToSemester" USING btree ("B");


--
-- Name: Course Course_coordinatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES public."Coordinator"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Course Course_instructorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES public."Supervisor"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Course Course_majorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES public."Major"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Course Course_minorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_minorId_fkey" FOREIGN KEY ("minorId") REFERENCES public."Major"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Enrollment Enrollment_courseID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Enrollment Enrollment_semesterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES public."Semester"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Enrollment Enrollment_studentID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Enrollment Enrollment_studentID_semesterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_studentID_semesterId_fkey" FOREIGN KEY ("studentID", "semesterId") REFERENCES public."StudentSemester"("studentId", "semesterId") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Enrollment Enrollment_supervisorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES public."Supervisor"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: FinishedCourses FinishedCourses_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."FinishedCourses"
    ADD CONSTRAINT "FinishedCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FinishedCourses FinishedCourses_instructorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."FinishedCourses"
    ADD CONSTRAINT "FinishedCourses_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES public."Supervisor"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: FinishedCourses FinishedCourses_studentID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."FinishedCourses"
    ADD CONSTRAINT "FinishedCourses_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FinishedCourses FinishedCourses_studentID_semesterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."FinishedCourses"
    ADD CONSTRAINT "FinishedCourses_studentID_semesterId_fkey" FOREIGN KEY ("studentID", "semesterId") REFERENCES public."StudentSemester"("studentId", "semesterId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Notifications Notifications_coordinatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES public."Coordinator"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Notifications Notifications_studentID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Notifications Notifications_supervisorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES public."Supervisor"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Semester Semester_coordinatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Semester"
    ADD CONSTRAINT "Semester_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES public."Coordinator"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: StudentSemester StudentSemester_semesterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."StudentSemester"
    ADD CONSTRAINT "StudentSemester_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES public."Semester"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: StudentSemester StudentSemester_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."StudentSemester"
    ADD CONSTRAINT "StudentSemester_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Student Student_coordinatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES public."Coordinator"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Student Student_majorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES public."Major"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Student Student_minorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_minorId_fkey" FOREIGN KEY ("minorId") REFERENCES public."Major"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Student Student_supervisorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES public."Supervisor"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Supervisor Supervisor_coordinatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."Supervisor"
    ADD CONSTRAINT "Supervisor_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES public."Coordinator"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: _CoursePrerequisites _CoursePrerequisites_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."_CoursePrerequisites"
    ADD CONSTRAINT "_CoursePrerequisites_A_fkey" FOREIGN KEY ("A") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CoursePrerequisites _CoursePrerequisites_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."_CoursePrerequisites"
    ADD CONSTRAINT "_CoursePrerequisites_B_fkey" FOREIGN KEY ("B") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CourseToSemester _CourseToSemester_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."_CourseToSemester"
    ADD CONSTRAINT "_CourseToSemester_A_fkey" FOREIGN KEY ("A") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CourseToSemester _CourseToSemester_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: abosamra
--

ALTER TABLE ONLY public."_CourseToSemester"
    ADD CONSTRAINT "_CourseToSemester_B_fkey" FOREIGN KEY ("B") REFERENCES public."Semester"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: abosamra
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

