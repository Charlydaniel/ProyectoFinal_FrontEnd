import { useContext, useEffect, useState } from "react";
import useFetch from "../../Hooks/UseFetch";
import { HomeContext } from "../../Contexts/HomeContext";
import Spinner from "../Spinner/Spinner";
import WorkspaceListComponent from "../Workspace-Components/WorkspaceList-Components/WorkspaceListComponent";
import { getuser } from "../../services/authService";
import ErrorComponent from "../Error-components/ErrorComponent";
import './HomeComponent.css'

export default function HomeComponent() {

  const { isLoading } = useContext(HomeContext);
  const { loading, response, error, sendRequest } = useFetch();
  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fethcData=async()=>{
      await sendRequest(() => getuser());
      setInitialLoading(false)
    }
    fethcData()
  }, []);

  useEffect(() => {
    if (response?.user) {
      setUser(response.user);
    }
  }, [response]);

  if ( loading || initialLoading || isLoading) {
    return (
      <div>
            <Spinner />;
      </div>
    )

  }


    return (
      <div className="home-body">
        <header className="header-login">
          <div className="header-login-icon">
            <a href="https://slack.com/">
              <img
                src="https://a.slack-edge.com/bv1-13/slack_logo-ebd02d1.svg"
                alt="Slack Logo"
                className="login-logo"
              />
            </a>
          </div>
        </header>

          {
            error?
            <ErrorComponent error={error}/>
            :
            (
            <section className="section-wellcome">
              <div className="section-text">
                <h1 className="section-title">¡Hola de nuevo! ¡No olvides hidratarte!</h1>
                <h5 className="section-subtitle">Elige uno de los siguientes espacios de trabajo para volver a trabajar con tu equipo.</h5>
                <h3 className="section-title">Listo para comenzar</h3>
                <p className="section-user">{user?.email || "Usuario"}</p> 
              </div>
              <div>
                  <WorkspaceListComponent /> 
              </div>

            </section>
            )
          }

      </div>
  );
}
