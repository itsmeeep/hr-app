--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-03-26 12:14:22 WIB

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
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3605 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16395)
-- Name: salary; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.salary (
    id integer NOT NULL,
    value numeric DEFAULT 0,
    description character varying(50),
    created_at date DEFAULT CURRENT_TIMESTAMP,
    updated_at date,
    deleted_at date
);


ALTER TABLE public.salary OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16423)
-- Name: salary_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.salary_details (
    id integer NOT NULL,
    salary_id numeric,
    jobclass_id numeric,
    created_at date DEFAULT CURRENT_DATE
);


ALTER TABLE public.salary_details OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16422)
-- Name: salary_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.salary_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.salary_details_id_seq OWNER TO postgres;

--
-- TOC entry 3606 (class 0 OID 0)
-- Dependencies: 217
-- Name: salary_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.salary_details_id_seq OWNED BY public.salary_details.id;


--
-- TOC entry 215 (class 1259 OID 16394)
-- Name: salary_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.salary_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.salary_id_seq OWNER TO postgres;

--
-- TOC entry 3607 (class 0 OID 0)
-- Dependencies: 215
-- Name: salary_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.salary_id_seq OWNED BY public.salary.id;


--
-- TOC entry 3445 (class 2604 OID 16398)
-- Name: salary id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salary ALTER COLUMN id SET DEFAULT nextval('public.salary_id_seq'::regclass);


--
-- TOC entry 3448 (class 2604 OID 16426)
-- Name: salary_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salary_details ALTER COLUMN id SET DEFAULT nextval('public.salary_details_id_seq'::regclass);


--
-- TOC entry 3597 (class 0 OID 16395)
-- Dependencies: 216
-- Data for Name: salary; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.salary (id, value, description, created_at, updated_at, deleted_at) FROM stdin;
2	200000	coba	2023-03-25	\N	\N
3	10000	coba	2023-03-25	\N	\N
1	7000	coba	2023-03-25	2023-03-25	2023-03-25
\.


--
-- TOC entry 3599 (class 0 OID 16423)
-- Dependencies: 218
-- Data for Name: salary_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.salary_details (id, salary_id, jobclass_id, created_at) FROM stdin;
2	2	2	2023-03-26
1	2	1	2023-03-26
\.


--
-- TOC entry 3608 (class 0 OID 0)
-- Dependencies: 217
-- Name: salary_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.salary_details_id_seq', 3, true);


--
-- TOC entry 3609 (class 0 OID 0)
-- Dependencies: 215
-- Name: salary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.salary_id_seq', 3, true);


--
-- TOC entry 3453 (class 2606 OID 16431)
-- Name: salary_details salary_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salary_details
    ADD CONSTRAINT salary_details_pkey PRIMARY KEY (id);


--
-- TOC entry 3451 (class 2606 OID 16404)
-- Name: salary salary_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salary
    ADD CONSTRAINT salary_pkey PRIMARY KEY (id);


-- Completed on 2023-03-26 12:14:23 WIB

--
-- PostgreSQL database dump complete
--

