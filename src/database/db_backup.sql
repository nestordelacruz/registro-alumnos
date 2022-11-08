--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

-- Started on 2022-11-07 20:20:30

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

DROP DATABASE alumnos_registro_ceneval;
--
-- TOC entry 3360 (class 1262 OID 16398)
-- Name: alumnos_registro_ceneval; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE alumnos_registro_ceneval WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE alumnos_registro_ceneval OWNER TO postgres;

\connect alumnos_registro_ceneval

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
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 3360
-- Name: DATABASE alumnos_registro_ceneval; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE alumnos_registro_ceneval IS 'Aqui deberan de guardarse los datos correspondientes a los nombres de los alumnos, asi como los resultados de la extraccion de datos';


--
-- TOC entry 221 (class 1255 OID 16448)
-- Name: last_upd_trig(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.last_upd_trig() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
   NEW.timestamp := current_timestamp;
   RETURN NEW;
END;$$;


ALTER FUNCTION public.last_upd_trig() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16399)
-- Name: alumnos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alumnos (
    name character varying(255) NOT NULL,
    middle_names character varying(255),
    last_name_father character varying(255) NOT NULL,
    last_name_mother character varying(255),
    id character varying(7) NOT NULL
);


ALTER TABLE public.alumnos OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16452)
-- Name: datos_extraidos_; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.datos_extraidos_ (
    name character varying(255),
    middle_names character varying(255),
    last_name_father character varying(255),
    last_name_mother character varying(255),
    id character varying(7) NOT NULL
);


ALTER TABLE public.datos_extraidos_ OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16460)
-- Name: datos_extraidos_s; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.datos_extraidos_s (
    id integer NOT NULL,
    name character varying(255),
    middle_names character varying(255),
    last_name_father character varying(255),
    last_name_mother character varying(255),
    "timestamp" timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.datos_extraidos_s OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16459)
-- Name: datos_extraidos_s_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.datos_extraidos_s_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.datos_extraidos_s_id_seq OWNER TO postgres;

--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 216
-- Name: datos_extraidos_s_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.datos_extraidos_s_id_seq OWNED BY public.datos_extraidos_s.id;


--
-- TOC entry 218 (class 1259 OID 16469)
-- Name: test; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test (
    id integer NOT NULL,
    name character varying(255),
    "timestamp" timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.test OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16476)
-- Name: tests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tests (
    id integer NOT NULL,
    name character varying(255),
    "timestamp" timestamp(6) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tests OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16475)
-- Name: tests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tests_id_seq OWNER TO postgres;

--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 219
-- Name: tests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tests_id_seq OWNED BY public.tests.id;


--
-- TOC entry 3191 (class 2604 OID 16463)
-- Name: datos_extraidos_s id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.datos_extraidos_s ALTER COLUMN id SET DEFAULT nextval('public.datos_extraidos_s_id_seq'::regclass);


--
-- TOC entry 3194 (class 2604 OID 16479)
-- Name: tests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tests ALTER COLUMN id SET DEFAULT nextval('public.tests_id_seq'::regclass);


--
-- TOC entry 3348 (class 0 OID 16399)
-- Dependencies: 214
-- Data for Name: alumnos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.alumnos (name, middle_names, last_name_father, last_name_mother, id) VALUES ('Elian', 'Javier', 'Cruz', 'Esquivel', 't032218');
INSERT INTO public.alumnos (name, middle_names, last_name_father, last_name_mother, id) VALUES ('Marco', 'Alejandro', 'Velez', 'del Callejo', 't026629');
INSERT INTO public.alumnos (name, middle_names, last_name_father, last_name_mother, id) VALUES ('Nestor', 'Manuel', 'de la Cruz', 'Escalante', 't031116');
INSERT INTO public.alumnos (name, middle_names, last_name_father, last_name_mother, id) VALUES ('David', '', 'Espina', 'Lopez', 't032025');
INSERT INTO public.alumnos (name, middle_names, last_name_father, last_name_mother, id) VALUES ('Marcos', 'Alberto', 'Moroyoqui', 'Olan', 't030934');
INSERT INTO public.alumnos (name, middle_names, last_name_father, last_name_mother, id) VALUES ('Hector', '', 'Osuna', 'Medrano', 't026950');


--
-- TOC entry 3349 (class 0 OID 16452)
-- Dependencies: 215
-- Data for Name: datos_extraidos_; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3351 (class 0 OID 16460)
-- Dependencies: 217
-- Data for Name: datos_extraidos_s; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.datos_extraidos_s (id, name, middle_names, last_name_father, last_name_mother, "timestamp") VALUES (1, 'Elian', 'Javier', 'Cruz', 'Esquivel', '2022-11-07 03:09:24.097137-08');
INSERT INTO public.datos_extraidos_s (id, name, middle_names, last_name_father, last_name_mother, "timestamp") VALUES (2, 'Elian', NULL, NULL, NULL, '2022-11-07 03:09:24.097137-08');
INSERT INTO public.datos_extraidos_s (id, name, middle_names, last_name_father, last_name_mother, "timestamp") VALUES (3, 'Elian', 'Javier', 'Cruz', 'Esquivel', '2022-11-07 03:09:24.097137-08');
INSERT INTO public.datos_extraidos_s (id, name, middle_names, last_name_father, last_name_mother, "timestamp") VALUES (4, 'Elian', 'Javier', 'Cruz', 'Esquivel', '2022-11-07 03:09:24.097137-08');
INSERT INTO public.datos_extraidos_s (id, name, middle_names, last_name_father, last_name_mother, "timestamp") VALUES (5, 'Elian', 'Javier', 'Cruz', 'Esquivel', '2022-11-07 03:09:45.440903-08');
INSERT INTO public.datos_extraidos_s (id, name, middle_names, last_name_father, last_name_mother, "timestamp") VALUES (6, 'Elian', 'Javier', 'Cruz', 'Esquivel', '2022-11-07 03:10:19.984309-08');
INSERT INTO public.datos_extraidos_s (id, name, middle_names, last_name_father, last_name_mother, "timestamp") VALUES (7, 'Elian', 'Javier', 'Cruz', 'Esquivel', '2022-11-07 11:06:28.242815-08');
INSERT INTO public.datos_extraidos_s (id, name, middle_names, last_name_father, last_name_mother, "timestamp") VALUES (8, 'Elian', 'Javier', 'Cruz', 'Esquivel', '2022-11-07 15:43:19.653366-08');
INSERT INTO public.datos_extraidos_s (id, name, middle_names, last_name_father, last_name_mother, "timestamp") VALUES (9, 'Elian', 'Javier', 'Cruz', 'Esquivel', '2022-11-07 16:05:21.072394-08');
INSERT INTO public.datos_extraidos_s (id, name, middle_names, last_name_father, last_name_mother, "timestamp") VALUES (10, 'Elian', 'Javier', 'Cruz', 'Esquivel', '2022-11-07 18:15:24.787262-08');
INSERT INTO public.datos_extraidos_s (id, name, middle_names, last_name_father, last_name_mother, "timestamp") VALUES (11, 'Elian', 'Javier', 'Cruz', 'Esquivel', '2022-11-07 18:22:59.550606-08');
INSERT INTO public.datos_extraidos_s (id, name, middle_names, last_name_father, last_name_mother, "timestamp") VALUES (12, 'Elian', 'Javier', 'Cruz', 'Esquivel', '2022-11-07 18:26:29.150976-08');
INSERT INTO public.datos_extraidos_s (id, name, middle_names, last_name_father, last_name_mother, "timestamp") VALUES (13, 'Elian', 'Javier', 'Cruz', 'Esquivel', '2022-11-07 18:28:40.092896-08');


--
-- TOC entry 3352 (class 0 OID 16469)
-- Dependencies: 218
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3354 (class 0 OID 16476)
-- Dependencies: 220
-- Data for Name: tests; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tests (id, name, "timestamp") VALUES (1, 'Elian', '2022-11-07 03:07:01.088423-08');
INSERT INTO public.tests (id, name, "timestamp") VALUES (2, 'Elian', '2022-11-07 03:07:01.088423-08');
INSERT INTO public.tests (id, name, "timestamp") VALUES (3, 'Elian', '2022-11-07 03:07:01.088423-08');
INSERT INTO public.tests (id, name, "timestamp") VALUES (4, 'Elian', '2022-11-07 03:07:21.064479-08');
INSERT INTO public.tests (id, name, "timestamp") VALUES (5, 'Elian', '2022-11-07 03:08:48.931367-08');
INSERT INTO public.tests (id, name, "timestamp") VALUES (6, 'Elian', '2022-11-07 03:08:49.446015-08');
INSERT INTO public.tests (id, name, "timestamp") VALUES (7, 'Elian', '2022-11-07 03:08:50.015292-08');


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 216
-- Name: datos_extraidos_s_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.datos_extraidos_s_id_seq', 13, true);


--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 219
-- Name: tests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tests_id_seq', 7, true);


--
-- TOC entry 3199 (class 2606 OID 16458)
-- Name: datos_extraidos_ datos_extraidos__pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.datos_extraidos_
    ADD CONSTRAINT datos_extraidos__pkey PRIMARY KEY (id);


--
-- TOC entry 3201 (class 2606 OID 16467)
-- Name: datos_extraidos_s datos_extraidos_s_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.datos_extraidos_s
    ADD CONSTRAINT datos_extraidos_s_pkey PRIMARY KEY (id);


--
-- TOC entry 3197 (class 2606 OID 16433)
-- Name: alumnos pk_alumnos; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alumnos
    ADD CONSTRAINT pk_alumnos PRIMARY KEY (id);


--
-- TOC entry 3203 (class 2606 OID 16474)
-- Name: test test_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_pkey PRIMARY KEY (id);


--
-- TOC entry 3205 (class 2606 OID 16481)
-- Name: tests tests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tests
    ADD CONSTRAINT tests_pkey PRIMARY KEY (id);


-- Completed on 2022-11-07 20:20:31

--
-- PostgreSQL database dump complete
--

