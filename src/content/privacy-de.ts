export interface PrivacySection {
  readonly id: string;
  readonly title: string;
  readonly paragraphs?: readonly string[];
  readonly listItems?: readonly string[];
  readonly subSections?: readonly PrivacySubSection[];
}

export interface PrivacySubSection {
  readonly heading: string;
  readonly paragraphs?: readonly string[];
  readonly listItems?: readonly string[];
  readonly paragraphsAfterList?: readonly string[];
}

export interface PrivacyPolicyContent {
  readonly introduction: readonly string[];
  readonly definitionsIntro: string;
  readonly definitionsItems: readonly PrivacySubSection[];
  readonly sections: readonly PrivacySection[];
  readonly closingNote: string;
}

export const privacyPolicyDe: PrivacyPolicyContent = {
  introduction: [
    'Vielen Dank für dein Interesse an meinen Webentwicklungs-Services. Datenschutz hat als freiberuflicher Webentwickler einen besonders hohen Stellenwert für mich. Eine Nutzung meiner Website ist grundsätzlich ohne jede Angabe personenbezogener Daten möglich. Sofern du besondere Services über meine Website in Anspruch nehmen möchtest, könnte jedoch eine Verarbeitung personenbezogener Daten erforderlich werden. Ist die Verarbeitung personenbezogener Daten erforderlich und besteht für eine solche Verarbeitung keine gesetzliche Grundlage, hole ich generell eine Einwilligung der betroffenen Person ein.',
    'Die Verarbeitung personenbezogener Daten, beispielsweise des Namens, der Anschrift, E-Mail-Adresse oder Telefonnummer einer betroffenen Person, erfolgt stets im Einklang mit der Datenschutz-Grundverordnung und in Übereinstimmung mit den geltenden landesspezifischen Datenschutzbestimmungen. Mittels dieser Datenschutzerklärung möchte ich die Öffentlichkeit über Art, Umfang und Zweck der von mir erhobenen, genutzten und verarbeiteten personenbezogenen Daten informieren. Ferner werden betroffene Personen mittels dieser Datenschutzerklärung über die ihnen zustehenden Rechte aufgeklärt.',
    'Als für die Verarbeitung Verantwortlicher habe ich zahlreiche technische und organisatorische Maßnahmen umgesetzt, um einen möglichst lückenlosen Schutz der über diese Website verarbeiteten personenbezogenen Daten sicherzustellen. Dennoch können internetbasierte Datenübertragungen grundsätzlich Sicherheitslücken aufweisen, sodass ein absoluter Schutz nicht gewährleistet werden kann. Aus diesem Grund steht es jeder betroffenen Person frei, personenbezogene Daten auch auf alternativen Wegen, beispielsweise telefonisch, an mich zu übermitteln.',
  ],
  definitionsIntro:
    'Diese Datenschutzerklärung beruht auf den Begrifflichkeiten, die durch den Europäischen Richtlinien- und Verordnungsgeber beim Erlass der Datenschutz-Grundverordnung (DS-GVO) verwendet wurden. Meine Datenschutzerklärung soll sowohl für die Öffentlichkeit als auch für meine Kunden und Geschäftspartner einfach lesbar und verständlich sein. Um dies zu gewährleisten, möchte ich vorab die verwendeten Begrifflichkeiten erläutern.',
  definitionsItems: [
    {
      heading: 'a) personenbezogene Daten',
      paragraphs: [
        'Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person (im Folgenden "betroffene Person") beziehen. Als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen Merkmalen, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen Person sind, identifiziert werden kann.',
      ],
    },
    {
      heading: 'b) betroffene Person',
      paragraphs: [
        'Betroffene Person ist jede identifizierte oder identifizierbare natürliche Person, deren personenbezogene Daten von dem für die Verarbeitung Verantwortlichen verarbeitet werden.',
      ],
    },
    {
      heading: 'c) Verarbeitung',
      paragraphs: [
        'Verarbeitung ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten wie das Erheben, das Erfassen, die Organisation, das Ordnen, die Speicherung, die Anpassung oder Veränderung, das Auslesen, das Abfragen, die Verwendung, die Offenlegung durch Übermittlung, Verbreitung oder eine andere Form der Bereitstellung, den Abgleich oder die Verknüpfung, die Einschränkung, das Löschen oder die Vernichtung.',
      ],
    },
    {
      heading: 'd) Einschränkung der Verarbeitung',
      paragraphs: [
        'Einschränkung der Verarbeitung ist die Markierung gespeicherter personenbezogener Daten mit dem Ziel, ihre künftige Verarbeitung einzuschränken.',
      ],
    },
    {
      heading: 'e) Profiling',
      paragraphs: [
        'Profiling ist jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass diese personenbezogenen Daten verwendet werden, um bestimmte persönliche Aspekte, die sich auf eine natürliche Person beziehen, zu bewerten, insbesondere, um Aspekte bezüglich Arbeitsleistung, wirtschaftlicher Lage, Gesundheit, persönlicher Vorlieben, Interessen, Zuverlässigkeit, Verhalten, Aufenthaltsort oder Ortswechsel dieser natürlichen Person zu analysieren oder vorherzusagen.',
      ],
    },
    {
      heading: 'f) Pseudonymisierung',
      paragraphs: [
        'Pseudonymisierung ist die Verarbeitung personenbezogener Daten in einer Weise, auf welche die personenbezogenen Daten ohne Hinzunahme zusätzlicher Informationen nicht mehr einer spezifischen betroffenen Person zugeordnet werden können, sofern diese zusätzlichen Informationen gesondert aufbewahrt werden und technischen und organisatorischen Maßnahmen unterliegen, die gewährleisten, dass die personenbezogenen Daten nicht einer identifizierten oder identifizierbaren natürlichen Person zugewiesen werden.',
      ],
    },
    {
      heading: 'g) Verantwortlicher oder für die Verarbeitung Verantwortlicher',
      paragraphs: [
        'Verantwortlicher oder für die Verarbeitung Verantwortlicher ist die natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet. Sind die Zwecke und Mittel dieser Verarbeitung durch das Unionsrecht oder das Recht der Mitgliedstaaten vorgegeben, so kann der Verantwortliche beziehungsweise können die bestimmten Kriterien seiner Benennung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten vorgesehen werden.',
      ],
    },
    {
      heading: 'h) Auftragsverarbeiter',
      paragraphs: [
        'Auftragsverarbeiter ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.',
      ],
    },
    {
      heading: 'i) Empfänger',
      paragraphs: [
        'Empfänger ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, der personenbezogene Daten offengelegt werden, unabhängig davon, ob es sich bei ihr um einen Dritten handelt oder nicht. Behörden, die im Rahmen eines bestimmten Untersuchungsauftrags nach dem Unionsrecht oder dem Recht der Mitgliedstaaten möglicherweise personenbezogene Daten erhalten, gelten jedoch nicht als Empfänger.',
      ],
    },
    {
      heading: 'j) Dritter',
      paragraphs: [
        'Dritter ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle außer der betroffenen Person, dem Verantwortlichen, dem Auftragsverarbeiter und den Personen, die unter der unmittelbaren Verantwortung des Verantwortlichen oder des Auftragsverarbeiters befugt sind, die personenbezogenen Daten zu verarbeiten.',
      ],
    },
    {
      heading: 'k) Einwilligung',
      paragraphs: [
        'Einwilligung ist jede von der betroffenen Person freiwillig für den bestimmten Fall in informierter Weise und unmissverständlich abgegebene Willensbekundung in Form einer Erklärung oder einer sonstigen eindeutigen bestätigenden Handlung, mit der die betroffene Person zu verstehen gibt, dass sie mit der Verarbeitung der sie betreffenden personenbezogenen Daten einverstanden ist.',
      ],
    },
  ],
  sections: [
    {
      id: 'responsible',
      title: 'Name und Anschrift des für die Verarbeitung Verantwortlichen',
      paragraphs: [
        'Verantwortlicher im Sinne der Datenschutz-Grundverordnung, sonstiger in den Mitgliedstaaten der Europäischen Union geltenden Datenschutzgesetze und anderer Bestimmungen mit datenschutzrechtlichem Charakter ist:',
        'Velo.Bar',
        'Sebastian Reichstaller & Lars Eggers GbR',
        'Matthias-Mayer-Straße 5',
        '81379 München',
        'E-Mail: hallo@velo-bar.com',
        'Telefon: +49 160 94623196',
      ],
    },
    {
      id: 'data-protection-officer',
      title: 'Name und Anschrift des Datenschutzbeauftragten',
      paragraphs: [
        'Als kleine GbR mit wenigen Mitarbeitern benötigen wir keinen externen Datenschutzbeauftragten. Für Datenschutzanfragen kontaktiere uns direkt:',
        'Velo.Bar',
        'Sebastian Reichstaller & Lars Eggers GbR',
        'Matthias-Mayer-Straße 5',
        '81379 München',
        'E-Mail: hallo@velo-bar.com',
        'Telefon: +49 160 94623196',
        'Jede betroffene Person kann sich jederzeit bei allen Fragen und Anregungen zum Datenschutz direkt an uns wenden.',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies',
      paragraphs: [
        'Meine Website verwendet Cookies. Cookies sind Textdateien, welche über einen Internetbrowser auf einem Computersystem abgelegt und gespeichert werden.',
        'Zahlreiche Internetseiten und Server verwenden Cookies. Viele Cookies enthalten eine sogenannte Cookie-ID. Eine Cookie-ID ist eine eindeutige Kennung des Cookies. Sie besteht aus einer Zeichenfolge, durch welche Internetseiten und Server dem konkreten Internetbrowser zugeordnet werden können, in dem das Cookie gespeichert wurde. Dies ermöglicht es den besuchten Internetseiten und Servern, den individuellen Browser der betroffenen Person von anderen Internetbrowsern, die andere Cookies enthalten, zu unterscheiden. Ein bestimmter Internetbrowser kann über die eindeutige Cookie-ID wiedererkannt und identifiziert werden.',
        'Durch den Einsatz von Cookies kann ich den Nutzern dieser Website nutzerfreundlichere Services bereitstellen, die ohne die Cookie-Setzung nicht möglich wären. Mittels eines Cookies können die Informationen und Angebote auf unserer Internetseite im Sinne des Benutzers optimiert werden. Cookies ermöglichen uns, die Benutzer unserer Internetseite wiederzuerkennen. Zweck dieser Wiedererkennung ist es, den Nutzern die Verwendung unserer Internetseite zu erleichtern. Der Benutzer einer Internetseite, die Cookies verwendet, muss beispielsweise nicht bei jedem Besuch der Internetseite erneut seine Zugangsdaten eingeben. Ein weiteres Beispiel ist das Cookie eines Warenkorbes im Online-Shop.',
        'Die betroffene Person kann die Setzung von Cookies durch unsere Internetseite jederzeit mittels einer entsprechenden Einstellung des genutzten Internetbrowsers verhindern und damit der Setzung von Cookies dauerhaft widersprechen. Ferner können bereits gesetzte Cookies jederzeit über einen Internetbrowser oder andere Softwareprogramme gelöscht werden. Deaktivierst du die Setzung von Cookies in dem genutzten Internetbrowser, sind unter Umständen nicht alle Funktionen unserer Internetseite vollumfänglich nutzbar.',
      ],
    },
    {
      id: 'general-data',
      title: 'Erfassung von allgemeinen Daten und Informationen',
      paragraphs: [
        'Meine Website erfasst mit jedem Aufruf der Internetseite durch eine betroffene Person oder ein automatisiertes System eine Reihe von allgemeinen Daten und Informationen. Diese allgemeinen Daten und Informationen werden in den Logfiles des Servers gespeichert. Erfasst werden können die verwendeten Browsertypen und Versionen, das vom zugreifenden System verwendete Betriebssystem, die Internetseite, von welcher ein zugreifendes System auf unsere Internetseite gelangt (Referrer), die Unterwebseiten, welche über ein zugreifendes System auf unserer Internetseite angesteuert werden, das Datum und die Uhrzeit eines Zugriffs auf die Internetseite, eine Internet-Protokoll-Adresse (IP-Adresse), der Internet-Service-Provider des zugreifenden Systems und sonstige ähnliche Daten und Informationen, die der Gefahrenabwehr im Falle von Angriffen auf unsere informationstechnologischen Systeme dienen.',
        'Bei der Nutzung dieser allgemeinen Daten und Informationen ziehe ich keine Rückschlüsse auf die betroffene Person. Diese Informationen werden vielmehr benötigt, um die Inhalte unserer Internetseite korrekt auszuliefern, die Inhalte unserer Internetseite sowie die Werbung für diese zu optimieren, die dauerhafte Funktionsfähigkeit unserer informationstechnologischen Systeme und der Technik unserer Internetseite zu gewährleisten sowie um Strafverfolgungsbehörden im Falle eines Cyberangriffes die zur Strafverfolgung notwendigen Informationen bereitzustellen. Diese anonym erhobenen Daten und Informationen werden daher einerseits statistisch ausgewertet und ferner mit dem Ziel, den Datenschutz und die Datensicherheit in unserem Unternehmen zu erhöhen, um letztlich ein optimales Schutzniveau sicherzustellen. Die anonymen Daten der Server-Logfiles werden getrennt von allen durch eine betroffene Person angegebenen personenbezogenen Daten gespeichert.',
      ],
    },
    {
      id: 'registration',
      title: 'Registrierung auf unserer Internetseite',
      paragraphs: [
        'Die betroffene Person hat die Möglichkeit, sich auf der Internetseite des für die Verarbeitung Verantwortlichen unter Angabe von personenbezogenen Daten zu registrieren. Welche personenbezogenen Daten dabei an den für die Verarbeitung Verantwortlichen übermittelt werden, ergibt sich aus der jeweiligen Eingabemaske, die für die Registrierung verwendet wird. Die von der betroffenen Person eingegebenen personenbezogenen Daten werden ausschließlich für die interne Verwendung bei dem für die Verarbeitung Verantwortlichen und für eigene Zwecke erhoben und gespeichert. Der für die Verarbeitung Verantwortliche kann die Weitergabe an einen oder mehrere Auftragsverarbeiter veranlassen, die die personenbezogenen Daten ebenfalls ausschließlich für eine interne Verwendung nutzen.',
        'Durch eine Registrierung auf der Internetseite des für die Verarbeitung Verantwortlichen wird ferner die vom Internet-Service-Provider der betroffenen Person vergebene IP-Adresse, das Datum sowie die Uhrzeit der Registrierung gespeichert. Die Speicherung dieser Daten erfolgt, um Missbrauch unserer Dienste zu verhindern und diese Daten im Bedarfsfall zu nutzen, um begangene Straftaten aufzuklären. Eine Weitergabe dieser Daten an Dritte erfolgt grundsätzlich nicht, sofern keine gesetzliche Pflicht zur Weitergabe besteht oder die Weitergabe der Strafverfolgung dient.',
        'Die Registrierung der betroffenen Person unter freiwilliger Angabe personenbezogener Daten dient dazu, der betroffenen Person Inhalte oder Leistungen anzubieten, die aufgrund der Natur der Sache nur registrierten Benutzern angeboten werden können. Registrierten Personen steht die Möglichkeit frei, die bei der Registrierung angegebenen personenbezogenen Daten jederzeit abzuändern oder vollständig aus dem Datenbestand des Verantwortlichen löschen zu lassen. Der Verantwortliche erteilt jeder betroffenen Person jederzeit auf Anfrage Auskunft darüber, welche personenbezogenen Daten über die betroffene Person gespeichert sind und berichtigt oder löscht diese personenbezogenen Daten auf Wunsch, soweit dem keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
      ],
    },
    {
      id: 'contact',
      title: 'Kontaktmöglichkeit über die Internetseite',
      paragraphs: [
        'Die Internetseite dieses Webentwicklungs-Portfolios enthält aufgrund gesetzlicher Vorschriften Angaben, die eine schnelle elektronische Kontaktaufnahme sowie eine unmittelbare Kommunikation ermöglichen. Sofern eine betroffene Person per E-Mail oder über ein Kontaktformular den Kontakt mit dem Verantwortlichen aufnimmt, werden die von der betroffenen Person übermittelten personenbezogenen Daten automatisch gespeichert. Solche auf freiwilliger Basis übermittelten personenbezogenen Daten werden für Zwecke der Bearbeitung oder der Kontaktaufnahme zur betroffenen Person gespeichert. Es erfolgt keine Weitergabe dieser personenbezogenen Daten an Dritte.',
      ],
    },
    {
      id: 'retention',
      title: 'Routinemäßige Löschung und Sperrung von personenbezogenen Daten',
      paragraphs: [
        'Der Verantwortliche verarbeitet und speichert personenbezogene Daten der betroffenen Person nur für den Zeitraum, der zur Erreichung des Speicherungszwecks erforderlich ist oder sofern dies durch den Europäischen Richtlinien- und Verordnungsgeber oder einen anderen Gesetzgeber in Gesetzen oder Vorschriften vorgesehen wurde. Entfällt der Speicherungszweck oder läuft eine vorgeschriebene Speicherfrist ab, werden die personenbezogenen Daten routinemäßig und entsprechend den gesetzlichen Vorschriften gesperrt oder gelöscht.',
      ],
    },
    {
      id: 'rights',
      title: 'Rechte der betroffenen Person',
      subSections: [
        {
          heading: 'a) Recht auf Bestätigung',
          paragraphs: [
            'Jede betroffene Person hat das Recht, von dem Verantwortlichen eine Bestätigung darüber zu verlangen, ob sie betreffende personenbezogene Daten verarbeitet werden. Möchte eine betroffene Person dieses Bestätigungsrecht in Anspruch nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des Verantwortlichen wenden.',
          ],
        },
        {
          heading: 'b) Recht auf Auskunft',
          paragraphs: [
            'Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, jederzeit vom Verantwortlichen unentgeltliche Auskunft über die zu ihrer Person gespeicherten personenbezogenen Daten und eine Kopie dieser Auskunft zu erhalten. Ferner besteht ein Recht auf Auskunft über folgende Informationen:',
          ],
          listItems: [
            'die Verarbeitungszwecke',
            'die Kategorien personenbezogener Daten, die verarbeitet werden',
            'die Empfänger oder Kategorien von Empfängern, gegenüber denen die personenbezogenen Daten offengelegt worden sind oder noch offengelegt werden, insbesondere bei Empfängern in Drittländern oder bei internationalen Organisationen',
            'falls möglich die geplante Dauer, für die die personenbezogenen Daten gespeichert werden, oder, falls dies nicht möglich ist, die Kriterien für die Festlegung dieser Dauer',
            'das Bestehen eines Rechts auf Berichtigung oder Löschung der personenbezogenen Daten oder auf Einschränkung der Verarbeitung durch den Verantwortlichen oder eines Widerspruchsrechts gegen diese Verarbeitung',
            'das Bestehen eines Beschwerderechts bei einer Aufsichtsbehörde',
            'wenn die personenbezogenen Daten nicht bei der betroffenen Person erhoben werden: alle verfügbaren Informationen über die Herkunft der Daten',
            'das Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling gemäß Artikel 22 Abs. 1 und 4 DS-GVO sowie aussagekräftige Informationen über die involvierte Logik sowie die Tragweite und angestrebten Auswirkungen einer solchen Verarbeitung',
            'das Bestehen eines Auskunftsrechts darüber, ob personenbezogene Daten an ein Drittland oder an eine internationale Organisation übermittelt wurden, sowie über geeignete Garantien im Zusammenhang mit der Übermittlung',
          ],
        },
        {
          heading: 'c) Recht auf Berichtigung',
          paragraphs: [
            'Jede betroffene Person hat das Recht, die unverzügliche Berichtigung sie betreffender unrichtiger personenbezogener Daten zu verlangen. Ferner besteht das Recht, unter Berücksichtigung der Zwecke der Verarbeitung, die Vervollständigung unvollständiger personenbezogener Daten – auch mittels einer ergänzenden Erklärung – zu verlangen.',
          ],
        },
        {
          heading: 'd) Recht auf Löschung (Recht auf Vergessen werden)',
          paragraphs: [
            'Jede betroffene Person hat das Recht, vom Verantwortlichen zu verlangen, dass die sie betreffenden personenbezogenen Daten unverzüglich gelöscht werden, sofern einer der folgenden Gründe zutrifft und soweit die Verarbeitung nicht erforderlich ist:',
          ],
          listItems: [
            'Die personenbezogenen Daten wurden für solche Zwecke erhoben oder auf sonstige Weise verarbeitet, für welche sie nicht mehr notwendig sind.',
            'Die betroffene Person widerruft ihre Einwilligung, auf die sich die Verarbeitung gemäß Art. 6 Abs. 1 Buchstabe a DS-GVO oder Art. 9 Abs. 2 Buchstabe a DS-GVO stützte, und es fehlt an einer anderweitigen Rechtsgrundlage für die Verarbeitung.',
            'Die betroffene Person legt gemäß Art. 21 Abs. 1 DS-GVO Widerspruch gegen die Verarbeitung ein, und es liegen keine vorrangigen berechtigten Gründe für die Verarbeitung vor, oder sie legt gemäß Art. 21 Abs. 2 DS-GVO Widerspruch gegen die Verarbeitung ein.',
            'Die personenbezogenen Daten wurden unrechtmäßig verarbeitet.',
            'Die Löschung der personenbezogenen Daten ist zur Erfüllung einer rechtlichen Verpflichtung erforderlich, der der Verantwortliche unterliegt.',
            'Die personenbezogenen Daten wurden in Bezug auf angebotene Dienste der Informationsgesellschaft gemäß Art. 8 Abs. 1 DS-GVO erhoben.',
          ],
          paragraphsAfterList: [
            'Sofern einer der genannten Gründe zutrifft und eine betroffene Person die Löschung von personenbezogenen Daten verlangt, die in meinem System gespeichert sind, kann sie sich jederzeit direkt an mich wenden. Wurden die personenbezogenen Daten öffentlich gemacht und bin ich zur Löschung verpflichtet, so treffe ich angemessene Maßnahmen, um andere Verantwortliche darüber zu informieren, dass die betroffene Person die Löschung sämtlicher Links zu diesen personenbezogenen Daten oder von Kopien verlangt hat, soweit die Verarbeitung nicht erforderlich ist.',
          ],
        },
        {
          heading: 'e) Recht auf Einschränkung der Verarbeitung',
          paragraphs: [
            'Jede betroffene Person hat das Recht, vom Verantwortlichen die Einschränkung der Verarbeitung zu verlangen, wenn eine der folgenden Voraussetzungen gegeben ist:',
          ],
          listItems: [
            'Die Richtigkeit der personenbezogenen Daten wird von der betroffenen Person bestritten, und zwar für eine Dauer, die es dem Verantwortlichen ermöglicht, die Richtigkeit zu überprüfen.',
            'Die Verarbeitung ist unrechtmäßig, die betroffene Person lehnt die Löschung der personenbezogenen Daten ab und verlangt stattdessen die Einschränkung der Nutzung.',
            'Der Verantwortliche benötigt die personenbezogenen Daten für die Zwecke der Verarbeitung nicht länger, die betroffene Person benötigt sie jedoch zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.',
            'Die betroffene Person hat Widerspruch gegen die Verarbeitung gemäß Art. 21 Abs. 1 DS-GVO eingelegt und es steht noch nicht fest, ob die berechtigten Gründe des Verantwortlichen gegenüber denen der betroffenen Person überwiegen.',
          ],
          paragraphsAfterList: [
            'Sofern eine der genannten Voraussetzungen gegeben ist und eine betroffene Person die Einschränkung der Verarbeitung verlangen möchte, kann sie sich jederzeit an einen Mitarbeiter wenden. Der Mitarbeiter wird die Einschränkung veranlassen.',
          ],
        },
        {
          heading: 'f) Recht auf Datenübertragbarkeit',
          paragraphs: [
            'Jede betroffene Person hat das Recht, die sie betreffenden personenbezogenen Daten, welche sie einem Verantwortlichen bereitgestellt hat, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten. Sie hat außerdem das Recht, diese Daten einem anderen Verantwortlichen zu übermitteln, sofern die Verarbeitung auf einer Einwilligung gemäß Art. 6 Abs. 1 Buchstabe a DS-GVO oder Art. 9 Abs. 2 Buchstabe a DS-GVO oder auf einem Vertrag gemäß Art. 6 Abs. 1 Buchstabe b DS-GVO beruht und die Verarbeitung mithilfe automatisierter Verfahren erfolgt.',
            'Ferner hat die betroffene Person bei der Ausübung ihres Rechts auf Datenübertragbarkeit das Recht, zu erwirken, dass die personenbezogenen Daten direkt von einem Verantwortlichen an einen anderen Verantwortlichen übermittelt werden, soweit dies technisch machbar ist und sofern hiervon nicht die Rechte und Freiheiten anderer Personen beeinträchtigt werden.',
          ],
        },
        {
          heading: 'g) Recht auf Widerspruch',
          paragraphs: [
            'Jede betroffene Person hat das Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 Buchstaben e oder f DS-GVO erfolgt, Widerspruch einzulegen. Dies gilt auch für Profiling.',
            'Verarbeite ich personenbezogene Daten, um Direktwerbung zu betreiben, so hat die betroffene Person das Recht, jederzeit Widerspruch gegen die Verarbeitung zum Zwecke derartiger Werbung einzulegen. Dies gilt auch für das Profiling, soweit es mit Direktwerbung in Verbindung steht.',
            'Zudem hat die betroffene Person das Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, gegen die sie betreffende Verarbeitung personenbezogener Daten zu wissenschaftlichen oder historischen Forschungszwecken oder zu statistischen Zwecken gemäß Art. 89 Abs. 1 DS-GVO Widerspruch einzulegen, es sei denn, eine solche Verarbeitung ist zur Erfüllung einer im öffentlichen Interesse liegenden Aufgabe erforderlich.',
            'Zur Ausübung des Rechts auf Widerspruch kann sich die betroffene Person direkt an mich wenden. Es steht der betroffenen Person ferner frei, ihr Widerspruchsrecht mittels automatisierter Verfahren auszuüben.',
          ],
        },
        {
          heading: 'h) Automatisierte Entscheidungen im Einzelfall einschließlich Profiling',
          paragraphs: [
            'Jede betroffene Person hat das Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung — einschließlich Profiling — beruhenden Entscheidung unterworfen zu werden, die ihr gegenüber rechtliche Wirkung entfaltet oder sie in ähnlicher Weise erheblich beeinträchtigt, sofern die Entscheidung nicht für den Abschluss oder die Erfüllung eines Vertrags erforderlich ist, aufgrund von Rechtsvorschriften zulässig ist oder mit ausdrücklicher Einwilligung erfolgt.',
            'Ist die Entscheidung für den Abschluss oder die Erfüllung eines Vertrags erforderlich oder erfolgt sie mit ausdrücklicher Einwilligung, trifft der Verantwortliche angemessene Maßnahmen, um die Rechte und Freiheiten sowie die berechtigten Interessen der betroffenen Person zu wahren, wozu mindestens das Recht auf Erwirkung des Eingreifens einer Person, auf Darlegung des eigenen Standpunkts und auf Anfechtung der Entscheidung gehört.',
          ],
        },
        {
          heading: 'i) Recht auf Widerruf einer datenschutzrechtlichen Einwilligung',
          paragraphs: [
            'Jede betroffene Person hat das Recht, eine Einwilligung zur Verarbeitung personenbezogener Daten jederzeit zu widerrufen. Möchte die betroffene Person dieses Recht geltend machen, kann sie sich jederzeit an einen Mitarbeiter des Verantwortlichen wenden.',
          ],
        },
      ],
    },
    {
      id: 'applications',
      title: 'Datenschutz bei Bewerbungen und im Bewerbungsverfahren',
      paragraphs: [
        'Der Verantwortliche erhebt und verarbeitet die personenbezogenen Daten von Bewerbern zum Zwecke der Abwicklung des Bewerbungsverfahrens. Die Verarbeitung kann auch auf elektronischem Wege erfolgen, beispielsweise per E-Mail oder über ein Webformular. Schließt der Verantwortliche einen Anstellungsvertrag mit einem Bewerber, werden die übermittelten Daten zum Zwecke der Abwicklung des Beschäftigungsverhältnisses unter Beachtung der gesetzlichen Vorschriften gespeichert.',
        'Wird kein Anstellungsvertrag geschlossen, werden die Bewerbungsunterlagen zwei Monate nach Bekanntgabe der Absageentscheidung automatisch gelöscht, sofern einer Löschung keine sonstigen berechtigten Interessen des Verantwortlichen entgegenstehen. Sonstiges berechtigtes Interesse ist beispielsweise eine Beweispflicht in einem Verfahren nach dem Allgemeinen Gleichbehandlungsgesetz (AGG).',
      ],
    },
    {
      id: 'facebook',
      title: 'Datenschutzbestimmungen zu Einsatz und Verwendung von Facebook',
      paragraphs: [
        'Der Verantwortliche hat auf dieser Internetseite Komponenten des Unternehmens Facebook integriert. Facebook ist ein soziales Netzwerk, das es Nutzern ermöglicht, untereinander zu kommunizieren und Informationen bereitzustellen.',
        'Betreibergesellschaft von Facebook ist die Facebook, Inc., 1 Hacker Way, Menlo Park, CA 94025, USA. Für betroffene Personen außerhalb der USA oder Kanada ist die Facebook Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Ireland verantwortlich.',
        'Durch jeden Aufruf einer Seite dieser Internetseite, die eine Facebook-Komponente enthält, wird der Internetbrowser der betroffenen Person veranlasst, eine Darstellung der entsprechenden Facebook-Komponente herunterzuladen. Im Rahmen dieses technischen Verfahrens erhält Facebook Kenntnis darüber, welche konkrete Unterseite besucht wird.',
        'Sofern die betroffene Person gleichzeitig bei Facebook eingeloggt ist, ordnet Facebook jeden Aufruf unserer Internetseite dem persönlichen Facebook-Benutzerkonto zu. Betätigt die betroffene Person einen der integrierten Facebook-Buttons oder gibt einen Kommentar ab, ordnet Facebook diese Information dem Benutzerkonto zu und speichert diese personenbezogenen Daten.',
        'Facebook erhält über die Facebook-Komponente immer dann Information darüber, dass die betroffene Person unsere Internetseite besucht hat, wenn sie zum Zeitpunkt des Aufrufs eingeloggt ist. Ist eine derartige Übermittlung nicht gewollt, kann die betroffene Person dies verhindern, indem sie sich vor einem Aufruf unserer Internetseite aus ihrem Facebook-Account ausloggt.',
        'Die von Facebook veröffentlichte Datenrichtlinie unter https://de-de.facebook.com/about/privacy/ gibt Aufschluss über die Erhebung, Verarbeitung und Nutzung personenbezogener Daten durch Facebook und erläutert Einstellungsmöglichkeiten zum Schutz der Privatsphäre.',
      ],
    },
    {
      id: 'google-analytics',
      title:
        'Datenschutzbestimmungen zu Einsatz und Verwendung von Google Analytics (mit Anonymisierungsfunktion)',
      paragraphs: [
        'Der Verantwortliche hat auf dieser Internetseite die Komponente Google Analytics mit Anonymisierungsfunktion integriert. Google Analytics ist ein Web-Analyse-Dienst der Google Inc., 1600 Amphitheatre Pkwy, Mountain View, CA 94043-1351, USA.',
        'Der Verantwortliche verwendet für die Web-Analyse über Google Analytics den Zusatz „_gat._anonymizeIp“. Mittels dieses Zusatzes wird die IP-Adresse des Internetanschlusses der betroffenen Person von Google gekürzt und anonymisiert, wenn der Zugriff aus einem Mitgliedstaat der EU oder einem anderen Vertragsstaat des Abkommens über den Europäischen Wirtschaftsraum erfolgt.',
        'Der Zweck der Google-Analytics-Komponente ist die Analyse der Besucherströme auf unserer Internetseite. Google nutzt die gewonnenen Daten, um die Nutzung unserer Internetseite auszuwerten, Online-Reports zusammenzustellen und weitere mit der Nutzung verbundenen Dienstleistungen zu erbringen.',
        'Google Analytics setzt ein Cookie auf dem informationstechnologischen System der betroffenen Person. Mit Setzung des Cookies wird Google eine Analyse der Benutzung unserer Internetseite ermöglicht. Mittels des Cookies werden personenbezogene Informationen, beispielsweise die Zugriffszeit, der Ort und die Häufigkeit der Besuche gespeichert. Diese Daten werden an Google in die USA übertragen und dort gespeichert und gegebenenfalls an Dritte weitergegeben.',
        'Die betroffene Person kann die Setzung von Cookies jederzeit mittels einer entsprechenden Einstellung ihres Internetbrowsers verhindern und bereits gesetzte Cookies löschen. Zudem besteht die Möglichkeit, die Erfassung der durch Google Analytics erzeugten Daten sowie deren Verarbeitung durch Google zu verhindern, indem ein Browser-Add-on unter https://tools.google.com/dlpage/gaoptout heruntergeladen und installiert wird.',
        'Weitere Informationen sowie die geltenden Datenschutzbestimmungen von Google können unter https://www.google.de/intl/de/policies/privacy/ und unter https://www.google.com/analytics/terms/de.html abgerufen werden.',
      ],
    },
    {
      id: 'google-adwords',
      title: 'Datenschutzbestimmungen zu Einsatz und Verwendung von Google-AdWords',
      paragraphs: [
        'Der Verantwortliche hat auf dieser Internetseite Google AdWords integriert. Google AdWords ist ein Dienst zur Internetwerbung, der es Werbetreibenden gestattet, Anzeigen in den Suchmaschinenergebnissen von Google sowie im Google-Werbenetzwerk zu schalten.',
        'Betreibergesellschaft der Dienste von Google AdWords ist die Google Inc., 1600 Amphitheatre Pkwy, Mountain View, CA 94043-1351, USA. Der Zweck von Google AdWords ist die Bewerbung unserer Internetseite durch die Einblendung interessenrelevanter Werbung sowie die Einblendung von Fremdwerbung auf unserer Internetseite.',
        'Gelangt eine betroffene Person über eine Google-Anzeige auf unsere Internetseite, wird auf ihrem System ein sogenannter Conversion-Cookie abgelegt. Dieser verliert nach dreißig Tagen seine Gültigkeit und dient nicht zur Identifikation der betroffenen Person. Über den Conversion-Cookie kann nachvollzogen werden, ob bestimmte Unterseiten aufgerufen wurden.',
        'Die durch den Conversion-Cookie erhobenen Daten werden von Google verwendet, um Besuchsstatistiken für unsere Internetseite zu erstellen. Weder unser Unternehmen noch andere Werbekunden von Google AdWords erhalten Informationen, mittels derer die betroffene Person identifiziert werden könnte.',
        'Die betroffene Person kann die Setzung von Cookies jederzeit verhindern und bereits gesetzte Cookies löschen. Zudem besteht die Möglichkeit, der interessenbezogenen Werbung durch Google zu widersprechen, indem der Link www.google.de/settings/ads aufgerufen und die gewünschten Einstellungen vorgenommen werden.',
        'Weitere Informationen und die geltenden Datenschutzbestimmungen von Google können unter https://www.google.de/intl/de/policies/privacy/ abgerufen werden.',
      ],
    },
    {
      id: 'agendize',
      title: 'Datenschutzbestimmungen zu Einsatz und Verwendung von Agendize',
      paragraphs: [
        'Der Verantwortliche hat auf dieser Internetseite Komponenten der Unternehmen Agendize SAS und Agendize Services Inc. integriert. Agendize ist ein Dienst zur Terminvereinbarung und erweitert den Nutzen der Internetseite, indem eine weitere Kontaktmöglichkeit geschaffen wird.',
        'Betreibergesellschaft von Agendize ist die Agendize SAS, 12 rue Bégand, 10000 Troyes, Frankreich. Folgende Daten werden erhoben: ausgewählter Termin (Datum), E-Mail-Adresse, Mobilnummer, gebuchte Leistungen sowie – falls angegeben – weitere mitgeteilte Daten.',
        'Die erhobenen Daten werden nach Ablauf des vereinbarten Termins gelöscht. Die geltenden Datenschutzbestimmungen von Agendize können unter https://www.agendize.de/datenschutzerklaerung/ abgerufen werden.',
      ],
    },
    {
      id: 'wipe-analytics',
      title: 'Datenschutzbestimmungen zu Einsatz und Verwendung von Wipe Analytics',
      paragraphs: [
        'Der Verantwortliche hat auf dieser Internetseite Komponenten des Unternehmens Wipe Analytics integriert. Wipe Analytics ist ein Web-Analyse-Dienst, der Daten über das Verhalten der Besucher von Internetseiten erhebt, sammelt und auswertet.',
        'Betreibergesellschaft von Wipe Analytics ist TENSQUARE GmbH, Wilhelminenstr. 29, 45881 Gelsenkirchen, Deutschland. Wipe Analytics setzt ein Cookie auf dem System der betroffenen Person, um Daten zu Marketing- und Optimierungszwecken zu übermitteln und pseudonyme Nutzungsprofile zu erstellen.',
        'Die über die Wipe Analytics-Komponente erhobenen Daten werden nicht ohne ausdrückliche Einwilligung zur Identifizierung der betroffenen Person genutzt und nicht mit anderen Daten zusammengeführt. Die betroffene Person kann die Setzung von Cookies verhindern und bereits gesetzte Cookies löschen. Zudem kann unter https://www.wipe-analytics.de/opt-out ein Opt-out-Cookie gesetzt werden.',
        'Die geltenden Datenschutzbestimmungen von Wipe Analytics können unter https://www.wipe-analytics.de/privacy abgerufen werden.',
      ],
    },
    {
      id: 'golocal',
      title: 'Datenschutzbestimmungen zu Einsatz und Verwendung von golocal und Meinungsmeister',
      paragraphs: [
        'Der Verantwortliche hat auf dieser Internetseite das Meinungsmeister-Widget integriert. Das Widget dient dazu, dem Besucher Informationen zur Reputation des Betreibers darzustellen. Über das Widget kann der Besucher auf eine Gesamtreputationsseite unter www.meinungsmeister.de gelangen.',
        'Betreibergesellschaft des Meinungsmeister-Widgets ist die GoLocal GmbH & Co. KG, Landsberger Str. 94, 80339 München, Deutschland. Golocal setzt ein Session-Cookie auf dem informationstechnologischen System des Besuchers, das beim Verlassen der Internetseite verschwindet. Aus technischen Gründen werden IP-Adresse und Datum des Aufrufs übertragen, diese Daten werden nach sieben Tagen gelöscht.',
        'Die geltenden Datenschutzbestimmungen von Meinungsmeister sind unter https://www.meinungsmeister.de/datenschutz/ abrufbar.',
      ],
    },
    {
      id: 'legal-basis',
      title: 'Rechtsgrundlage der Verarbeitung',
      paragraphs: [
        'Art. 6 Abs. 1 lit. a DS-GVO dient unserem Unternehmen als Rechtsgrundlage für Verarbeitungsvorgänge, bei denen wir eine Einwilligung für einen bestimmten Verarbeitungszweck einholen. Ist die Verarbeitung zur Erfüllung eines Vertrags erforderlich, beruht sie auf Art. 6 Abs. 1 lit. b DS-GVO. Gleiches gilt für vorvertragliche Maßnahmen.',
        'Unterliegt unser Unternehmen einer rechtlichen Verpflichtung, die eine Verarbeitung personenbezogener Daten erfordert, basiert die Verarbeitung auf Art. 6 Abs. 1 lit. c DS-GVO. In seltenen Fällen kann die Verarbeitung erforderlich sein, um lebenswichtige Interessen zu schützen (Art. 6 Abs. 1 lit. d DS-GVO). Verarbeitungsvorgänge können zudem auf Art. 6 Abs. 1 lit. f DS-GVO beruhen, wenn sie zur Wahrung eines berechtigten Interesses erforderlich sind.',
      ],
    },
    {
      id: 'legitimate-interest',
      title:
        'Berechtigte Interessen an der Verarbeitung, die vom Verantwortlichen oder einem Dritten verfolgt werden',
      paragraphs: [
        'Basiert die Verarbeitung personenbezogener Daten auf Art. 6 Abs. 1 lit. f DS-GVO, ist unser berechtigtes Interesse die Durchführung unserer Geschäftstätigkeit zugunsten des Wohlergehens all unserer Mitarbeiter und Anteilseigner.',
      ],
    },
    {
      id: 'storage-duration',
      title: 'Dauer, für die die personenbezogenen Daten gespeichert werden',
      paragraphs: [
        'Das Kriterium für die Dauer der Speicherung von personenbezogenen Daten ist die jeweilige gesetzliche Aufbewahrungsfrist. Nach Ablauf der Frist werden die entsprechenden Daten routinemäßig gelöscht, sofern sie nicht mehr zur Vertragserfüllung oder Vertragsanbahnung erforderlich sind.',
      ],
    },
    {
      id: 'data-provision',
      title:
        'Gesetzliche oder vertragliche Vorschriften zur Bereitstellung der personenbezogenen Daten',
      paragraphs: [
        'Wir klären Sie darüber auf, dass die Bereitstellung personenbezogener Daten zum Teil gesetzlich vorgeschrieben ist (z. B. Steuervorschriften) oder sich aus vertraglichen Regelungen ergeben kann. Mitunter kann es für einen Vertragsschluss erforderlich sein, personenbezogene Daten bereitzustellen, die anschließend verarbeitet werden müssen.',
        'Die betroffene Person ist beispielsweise verpflichtet, uns personenbezogene Daten bereitzustellen, wenn unser Unternehmen mit ihr einen Vertrag abschließt. Eine Nichtbereitstellung hätte zur Folge, dass der Vertrag nicht geschlossen werden könnte. Vor einer Bereitstellung kann sich die betroffene Person an einen unserer Mitarbeiter wenden, der über die Erforderlichkeit im Einzelfall aufklärt.',
      ],
    },
    {
      id: 'automated-decisions',
      title: 'Bestehen einer automatisierten Entscheidungsfindung',
      paragraphs: [
        'Als verantwortungsbewusstes Unternehmen verzichten wir auf eine automatische Entscheidungsfindung oder ein Profiling.',
      ],
    },
  ],
  closingNote:
    'Diese Datenschutzerklärung wurde durch den Datenschutzerklärungs-Generator der DGD Deutsche Gesellschaft für Datenschutz GmbH, die als externer Datenschutzbeauftragter tätig ist, in Kooperation mit dem Datenschutz-Rechtsanwalt Christian Solmecke erstellt.',
};
