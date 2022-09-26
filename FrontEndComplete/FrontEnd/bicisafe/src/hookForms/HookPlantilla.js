import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const HookPlantilla = (schema, mode) => {
    
    const hooks = useForm({
        resolver: yupResolver(schema),
        mode,
    });

    const {
        register,
        formState: { errors },
    } = hooks;

    const formProps = (name) => {
        return{
            error: !!errors[name],
            helperText: erros[name]?.message,
            fullWidth: true,
			margin: "normal",
			variant: "outlined",
			...register(name),
        };
    };
    retu

}