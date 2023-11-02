import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      // aqui pueden hacer un api.get para obtener la configuracion actual
      //
      return {
        nombreDelCampo: "valor de la base de datos",
      };
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Aqui deben de enviar a la api un cambio en la configuracion
  };

  console.log(watch("nombreDelCampo")); // watch input value by passing the name of it

  return (
    <form className="flex flex-col gap-2 p-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center items-center p-4  bg-slate-100 rounded-md shadow-black">
        <label className="whitespace-nowrap mr-5">Setting 1:</label>
        <input
          className="w-full h-10 rounded"
          {...register("nombreDelCampo")}
        />
      </div>

      <div className="flex justify-center items-center p-4  bg-slate-100 rounded-md shadow-black">
        <label className="whitespace-nowrap mr-5">Setting 1:</label>
        <input
          className="w-full h-10 rounded"
          {...register("nombreDelCampo")}
        />
      </div>

      <input
        className="w-fit h-10 px-4 bg-green-300 rounded text-slate-800 py-2 cursor-pointer hover:bg-green-400"
        type="submit"
      />
    </form>
  );
}
