import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Navbar from './components/navbar';
import LoginPage from './login';
import HomeExternal from './page/external/home_external';
import Fromchase from './page/from/from_chase';
import FromUpdate from './page/from/from_update';
import Fullinternalmemo from './page/full_internalmemo';
import Homedocument from './page/home_document';
import Fromexternal from './page/external/from_external';
import Fullexternal from './page/external/full_external';
import FromExternalUpdate from './page/external/from_external_update';
import HomeInternalDoc from './page/internal_doc/home_internal_doc';
import Fullinternaldoc from './page/internal_doc/full_internal_doc';
import Frominternaldoc from './page/internal_doc/from_internal_doc';
import FrominternaldocUpdate from './page/internal_doc/from_internaldoc_update';
import HomeRegis from './page/regisdoc/home_regis';
import FromRegisDoc from './page/regisdoc/from_regisdoc';
import HomeCertificate from './page/approve_certificate/home_certificate';
import FromCertificate from './page/approve_certificate/from_certificate';
import HomeFinancial from './page/financial/home_financial';
import Fromfinancial from './page/financial/from_financial';
import HomeDocmeet from './page/docmeet/home_docmeet';
import FromDocmeet from './page/docmeet/from_docmeet';
import Homeorganization from './page/organizational/home_organization';
import Fromorganization from './page/organizational/from_organization';
import Homedocpower from './page/docpower/home_docpower';
import Fromdocpower from './page/docpower/from_docpower';
import Homerulecard from './page/rulecard/home_rulecard';
import Fromrulecard from './page/rulecard/from_rulecard';
import Homeethics from './page/ethics/home_ethics';
import Fromethics from './page/ethics/from_ethics';
import HomeManual from './page/manual/home_manual';
import FromManual from './page/manual/from_manual';
import Homedocout from './page/docout/home_docout';
import Fromdocout from './page/docout/from_docout';
import Homesealcom from './page/sealcom/home_sealcom';
import Fromsealcom from './page/sealcom/from_sealcom';
import Homeproperty from './page/property/home_property';
import Fromproperty from './page/property/from_property';

const App = () => {
  let routes = useRoutes([
    { path: '/', element: <LoginPage /> },

    { path: '/navbar', element: <Navbar /> },
    { path: '/home-document', element: <Homedocument /> },
    { path: '/full-internall', element: <Fullinternalmemo /> },
    { path: '/from-chase/:type', element: <Fromchase /> },
    { path: '/from-rway/:type', element: <Fromchase /> },
    { path: '/from-cmt/:type', element: <Fromchase /> },
    { path: '/from-cfam/:type', element: <Fromchase /> },
    { path: '/from-aa/:type', element: <Fromchase /> },
    { path: '/from-internal-update/:id', element: <FromUpdate /> },

    { path: '/home-external', element: <HomeExternal /> },
    { path: '/full-external', element: <Fullexternal /> },
    { path: '/fromext-chase/:type', element: <Fromexternal /> },
    { path: '/fromext-rway/:type', element: <Fromexternal /> },
    { path: '/fromext-cmt/:type', element: <Fromexternal /> },
    { path: '/fromext-cfam/:type', element: <Fromexternal /> },
    { path: '/fromext-aa/:type', element: <Fromexternal /> },
    { path: '/from-external-update/:id', element: <FromExternalUpdate /> },

    { path: '/home-internaldoc', element: <HomeInternalDoc /> },
    { path: '/full-internaldoc', element: <Fullinternaldoc /> },
    { path: '/fromint-chase/:type', element: <Frominternaldoc /> },
    { path: '/fromint-rway/:type', element: <Frominternaldoc /> },
    { path: '/fromint-cmt/:type', element: <Frominternaldoc /> },
    { path: '/fromint-cfam/:type', element: <Frominternaldoc /> },
    { path: '/fromint-aa/:type', element: <Frominternaldoc /> },
    {
      path: '/from-internaldoc-update/:id',
      element: <FrominternaldocUpdate />,
    },

    // ===================================================================
    { path: '/home-regis-doc', element: <HomeRegis /> },
    { path: '/fromregisdoc', element: <FromRegisDoc /> },
    { path: '/fromregisdoc/:id', element: <FromRegisDoc /> },
    // ===================================================================
    { path: '/home-certificate', element: <HomeCertificate /> },
    { path: '/fromcertificate', element: <FromCertificate /> },
    { path: '/fromcertificate/:id', element: <FromCertificate /> },
    // ===================================================================
    { path: '/home-financial', element: <HomeFinancial /> },
    { path: '/fromfinancial', element: <Fromfinancial /> },
    { path: '/fromfinancial/:id', element: <Fromfinancial /> },
    // ===================================================================
    { path: '/home-docmeet', element: <HomeDocmeet /> },
    { path: '/fromdocmeet', element: <FromDocmeet /> },
    { path: '/fromdocmeet/:id', element: <FromDocmeet /> },
    // ===================================================================
    // ===================================================================
    { path: '/home-organization', element: <Homeorganization /> },
    { path: '/fromorganization', element: <Fromorganization /> },
    { path: '/fromorganization/:id', element: <Fromorganization /> },
    // ===================================================================

    // ===================================================================
    { path: '/home-docpower', element: <Homedocpower /> },
    { path: '/fromdocpower', element: <Fromdocpower /> },
    { path: '/fromdocpower/:id', element: <Fromdocpower /> },
    // ===================================================================

    // ===================================================================
    { path: '/home-rulecard', element: <Homerulecard /> },
    { path: '/fromrulecard', element: <Fromrulecard /> },
    { path: '/fromrulecard/:id', element: <Fromrulecard /> },
    // ===================================================================

    // ===================================================================
    { path: '/home-ethics', element: <Homeethics /> },
    { path: '/fromethics', element: <Fromethics /> },
    { path: '/fromethics/:id', element: <Fromethics /> },
    // ===================================================================

    // ===================================================================
    { path: '/home-manual', element: <HomeManual /> },
    { path: '/frommanual', element: <FromManual /> },
    { path: '/frommanual/:id', element: <FromManual /> },
    // ===================================================================

    // ===================================================================
    { path: '/home-docout', element: <Homedocout /> },
    { path: '/fromdocout', element: <Fromdocout /> },
    { path: '/fromdocout/:id', element: <Fromdocout /> },
    // ===================================================================

    // ===================================================================
    { path: '/home-sealcom', element: <Homesealcom /> },
    { path: '/fromsealcom', element: <Fromsealcom /> },
    { path: '/fromsealcom/:id', element: <Fromsealcom /> },
    // ===================================================================

    // ===================================================================
    { path: '/home-property', element: <Homeproperty /> },
    { path: '/fromproperty', element: <Fromproperty /> },
    { path: '/fromproperty/:id', element: <Fromproperty /> },
    // ===================================================================
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
