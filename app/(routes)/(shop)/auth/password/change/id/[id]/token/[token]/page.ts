import ChangePasswordForm from "@/components/ChangePasswordForm"

const ChangePassword = ({params}) => {
    return(
        <ChangePasswordForm id={params.id} token={params.token} />
    )
}

export default ChangePassword