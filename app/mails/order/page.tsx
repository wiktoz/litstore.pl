import {Html, Img, Tailwind, Section, Text, Container, Row} from '@react-email/components'

const OrderCompleted = () => {
    return(
        <Html>
            <Tailwind>
            <Container className={"bg-gray-100 flex justify-center items-center"}>
                <Section className={"rounded-2xl bg-white"}>
                    <Row className={"py-12 px-8 m-8"}>
                        <Img
                            src={"/img/litstore.png"}
                            width="0"
                            height="0"
                            sizes="100vw"
                            className="w-32 h-auto mx-auto"
                            alt="logo"
                        />
                    </Row>
                    <Text className="text-lg font-semibold">Dziękujemy za złożenie zamówienia</Text>
                    <Text className="text-xs text-gray-500">O zmianach statusu zamówienia będziemy informować mailowo.</Text>
                </Section>
            </Container>
            </Tailwind>
        </Html>
    )
}

export default OrderCompleted