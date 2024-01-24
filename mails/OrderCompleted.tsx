import { Html } from '@react-email/html'
import { Img } from '@react-email/img'
import { Tailwind } from '@react-email/tailwind'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'

const OrderCompleted = () => {
    return(
        <Html>
            <Tailwind>
                <Img
                    src={"https://litstore.pl/img/litstore.png"}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-32 h-auto"
                    alt="logo"
                />

            <Section>
                <Text className="text-lg font-semibold">Dziękujemy za złożenie zamówienia</Text>
                <Text className="text-xs text-gray-500">O zmianach statusu zamówienia będziemy informować mailowo.</Text>
            </Section>
            </Tailwind>
        </Html>
    )
}

export default OrderCompleted