import ChangePasswordForm from "@/components/ChangePasswordForm"

const ChangePassword = ({params}:{params: {id: string, token: string}}) => {
    return(
        <ChangePasswordForm id={params.id} token={params.token} />
    )
}

export default ChangePassword