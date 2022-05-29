const headerFooterColor = "#1B1B3A"

const styles = {
    //image style
    imgStyle: {
        width: '100%',
        height: 'auto',
    },
    //header and footer
    footerHeight: {
        minHeight: "98vh"
    },
    appBarStyle: {
        bgcolor: headerFooterColor
    },
    //SearchPage styles
    formsContainerStyle: {
        padding: '2rem',
        margin: '1rem',
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchFormsStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    singleFormStyle: {
        width: '18rem',
        margin: '0.5rem'
    },
    componentContainerStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    homepageTitleStyle: {
        margin: '1.5rem',
        fontSize: '2rem'
    },
    searchButtonStyle: {
        width: '6rem',
        height: '3.5rem'
    },
    topOfFormMsgStyle: {
        margin: '1rem',
        fontSize: '1rem',
    },
    searchMessageStyle: {
        margin: '1.5rem',
        fontSize: '1.5rem',
    },
    //MediaCard styles
    cardStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        minHeight: '13rem',
        maxWidth: '75rem',
        width: 'auto',
        margin: '1rem',
    },
    imgContainerStyle: {
        minWidth: '9rem',
        width: '9rem',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    cardSectionStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '13rem',
        margin: '0.5rem',
    },
    menuButtonStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitleStyle: {
        typography: 'subtitle2',
        fontStyle: 'italic',
        fontSize: '1.2rem'
    },
    sectionBodyStyle: {
        typography: 'body2',
        width: '100%'
    },
    //Header Styles
    toolbarStyle: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    linkStyle: {
        margin: '0px 5rem'
    },
    //Footer styles
    footerContainerStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        bgcolor: headerFooterColor,
        padding: '0.7rem'
    },
    footerTextStyle: {
        margin: '0.5rem',
        color: 'white'
    }
}

export default styles;

