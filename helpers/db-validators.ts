import { Auth, Product, Roles } from "../models";

export const existRole = async () => {
  const existR = await Roles.find();
  if (existR.length < 1) {
    const admin = new Roles();
    admin.role = "ADMIN";

    await admin.save();

    const user = new Roles();
    user.role = "USER";

    await user.save();
    console.log(admin);
    console.log(user);
  }
};

export const validarRol = async (role: string) => {
  const existRole = await Roles.find({
    where: {
      role,
    },
  });
  if (existRole.length === 0) {
    throw new Error(`El rol : ${role} no existe en la base de datos`);
  }
};

export const validarExistEmail = async (email: string) => {
  const existEmail = await Auth.find({
    where: {
      email: email,
    },
  });
  if (existEmail.length > 0) {
    throw new Error(
      `El correo : ${email} ya esta registrado en la base de datos`
    );
  }
};

export const validarExistName = async (name: string) => {
  const existname = await Product.findOne({
    where: {
      name: name,
    },
  });
  if (!existname) {
    throw new Error(
      `El producto : ${name} ya esta registrado en la base de datos`
    );
  }
};
