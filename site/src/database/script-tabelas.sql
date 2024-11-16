create database petplanner;

use petplanner;

create table usuario (
	id_usuario int primary key auto_increment,
    nome varchar(60),
    email varchar(60),
    senha varchar(45)
); 

create table pet (
	id_pet int auto_increment,
    fk_usuario int,
    primary key(id_pet, fk_usuario),
    nome varchar(60),
    dt_nasc date,
    sexo char(1),
    constraint chkSexo check (sexo in('M', 'F')),
    tipo varchar(10),
    constraint chkTipo check (tipo in('Gato', 'Cachorro', 'Pássaro', 'Coelho', 'Outros')),
    foreign key (fk_usuario) references usuario(id_usuario)
) auto_increment = 100;

create table tarefa(
	id_atividade int auto_increment,
	fk_pet int,
	fk_usuario int,
    primary key(id_atividade, fk_pet, fk_usuario),
    categoria varchar(45),
    descricao varchar(255),
    data_final date,
    status_atual varchar(8),
    constraint chkStatus check(status_atual in('Pendente', 'Concluído')),
    foreign key (fk_pet) references pet(id_pet),
    foreign key (fk_usuario) references usuario(id_usuario)
) auto_increment = 1000;