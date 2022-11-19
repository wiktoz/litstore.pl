import Head from 'next/head'
import Script from 'next/script'

const Geowidget = () => {
    const afterPointSelected = (e) => {
        console.log(e.details)
    }

    return (
        <>
        <Head>
          <script src='https://sandbox-easy-geowidget-sdk.easypack24.net/inpost-geowidget.js' strategy="lazyOnload" />
        </Head>
        <div className="my-5">
            <inpost-geowidget onpoint={afterPointSelected} token='eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkVzROZW9TeXk0OHpCOHg4emdZX2t5dFNiWHY3blZ0eFVGVFpzWV9TUFA4In0.eyJleHAiOjE5ODA2NzMxODQsImlhdCI6MTY2NTMxMzE4NCwianRpIjoiOGZlZmE5YjItZTdkMS00MjhmLWI0MzktYTMyZmY3MmIyZGEwIiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWxvZ2luLmlucG9zdC5wbC9hdXRoL3JlYWxtcy9leHRlcm5hbCIsInN1YiI6ImY6N2ZiZjQxYmEtYTEzZC00MGQzLTk1ZjYtOThhMmIxYmFlNjdiOmI5bHhxQ0YteXJSeDR0VThFdWJTV0EiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzaGlweCIsInNlc3Npb25fc3RhdGUiOiI2ZDYyN2QzNC1kMzkzLTQ3OGQtYjM3NS1hOGEyY2Q0NWYwOWQiLCJzY29wZSI6Im9wZW5pZCBhcGk6YXBpcG9pbnRzIiwic2lkIjoiNmQ2MjdkMzQtZDM5My00NzhkLWIzNzUtYThhMmNkNDVmMDlkIiwiYWxsb3dlZF9yZWZlcnJlcnMiOiJ3ZG9icnltc2tsZXBpZS5wbCIsInV1aWQiOiI5ODY0OWY0NC1hYjZmLTQyNDYtOTEwNC0yYmI2MTIyNmI2ZjEifQ.iumtjrwQu5CO8GcpvMmoB2icJAqEpSlFiU5MtFyvT-pD3OsY_ZtNNGBi9vauQY7RIQp66LlGeCyUfteg22CdAeDqEg6ZE9mJgMH8w-Zh13X9CyM0-Xi45JIurmzCpMoxlq9EUuWHSLDQmipQa-bb2toFujZG9g0b9WysjG2a2hmjWPA1qCSnbLfgZOAeAJSx3DTv-5Z4Vj4Kka2CUoCXo0xdZ89G92p5DqOuLvuqQkMuZ1qU9_n_-8UKWU14jcyLWVp2u7HgKp90ahExExPVX-xLPLcHTCNr8EvgnP3bQx5GSqGfH5nJHQ305_UFb9YZWC2dCjuPijgJh4ZoMAx6Xg' language='pl'  config='parcelCollect'></inpost-geowidget>
        </div>
        </>
    )
}

export default Geowidget