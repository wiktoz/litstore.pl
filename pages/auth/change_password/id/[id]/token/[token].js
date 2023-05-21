import { useRouter } from "next/router"
import ChangePasswordForm from "../../../../../../components/ChangePasswordForm"

const ChangePassword = () => {
    const router = useRouter()
    const { id, token } = router.query

    return(
        <ChangePasswordForm id={id} token={token} />
    )
}

export default ChangePassword