import { response, request } from "express";
import * as bcryptjs from "bcryptjs";
import { Auth } from "../models/";

export const usuariosGet = async (req = request, res = response) => {
  const user = await Auth.find({
    where: {
      state: true,
    },
  });

  res.json({
    user,
  });
};
export const usuariosPost = async (req = request, res = response) => {
  const { name, email, role, password, money } = req.body;

  const user = new Auth();

  user.name = name;
  user.email = email;
  user.role = role === "ADMIN" ? 1 : 2;
  user.money = money;
  user.state = true;

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    msg: "post api bien",
    user,
  });
};

export const login = async (req = request, res = response) => {
  // const body = req.body;

  // res.json({
  //   msg: "post api bien",
  //   body,
  // });

  try {
    const { email, password } = req.body;
    // verificar que el email existe
    const usuario = await Auth.findOne({
      where: {
        email,
      },
    });

    if (!usuario) {
      return res.status(400).json({
        msg: `El email : ${email} no esta registrado`,
      });
    }

    //validar estado del usuario
    if (!usuario.state) {
      return res.status(400).json({
        msg: `El email : ${email} ha sido eliminado `,
      });
    }

    // validar contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: `La contraseña es incorrecta`,
      });
    }

    res.json({
      msg: "ok",
      usuario,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
export const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const usuario = await Auth.update({ id: parseInt(id) }, { state: false });

  res.json({
    msg: "Usuario eliminado con exito",
  });
};

export const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, role, ...resto } = req.body;

  if (role) {
    resto.role = role === "ADMIN" ? 1 : 2;
  }

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Auth.update({ id: parseInt(id) }, resto);

  res.json({
    msg: "usuario modificado con exito",
  });
};
