PGDMP     %    '        
        |         
   bdclientes %   14.11 (Ubuntu 14.11-0ubuntu0.22.04.1) %   14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16386 
   bdclientes    DATABASE     _   CREATE DATABASE bdclientes WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'pt_BR.UTF-8';
    DROP DATABASE bdclientes;
                postgres    false            �            1259    16388    clientes    TABLE     �   CREATE TABLE public.clientes (
    id integer NOT NULL,
    nome character varying(200) NOT NULL,
    email character varying(200),
    telefone character varying(20),
    coordenada_x double precision,
    coordenada_y double precision
);
    DROP TABLE public.clientes;
       public         heap    postgres    false            �            1259    16387    clientes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.clientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.clientes_id_seq;
       public          postgres    false    210                       0    0    clientes_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.clientes_id_seq OWNED BY public.clientes.id;
          public          postgres    false    209            �           2604    16391    clientes id    DEFAULT     j   ALTER TABLE ONLY public.clientes ALTER COLUMN id SET DEFAULT nextval('public.clientes_id_seq'::regclass);
 :   ALTER TABLE public.clientes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    210    210                      0    16388    clientes 
   TABLE DATA           Y   COPY public.clientes (id, nome, email, telefone, coordenada_x, coordenada_y) FROM stdin;
    public          postgres    false    210   ?                   0    0    clientes_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.clientes_id_seq', 21, true);
          public          postgres    false    209            �           2606    16393    clientes clientes_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.clientes DROP CONSTRAINT clientes_pkey;
       public            postgres    false    210               �   x�5�Aj�0E��)�l1�l��]��n�Q�LHbp����u�-!}����2Z���̏��0|l��a, zV%�3EBJ	b:ǡ��]m^���[��\�Z�E�_<>����e����>��Q��߬ޖ�8��w_�Y�CE�!����KSa����8i��ΎJ�~��6��
g�=l�xR�{�>r����P��L���$�15C��s?�NN     