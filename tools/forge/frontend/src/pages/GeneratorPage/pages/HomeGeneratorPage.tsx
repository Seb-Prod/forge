import { Text, GridLayout, Card } from "@workspace/ui";

export const HomeGeneratorPage = () => {
  return (
    <div>
      <section>
        <Text align="center">Générateur de code</Text>
        <Text as="p">
          Bienvenue dans l’outil de génération de code du workspace. Cette
          interface permet de créer rapidement des composants, des fonctions et
          différents types de fichiers à partir de templates standardisés.
        </Text>
        <Text>
          Utilisez le menu de navigation à gauche pour accéder aux différents
          générateurs disponibles.
        </Text>
      </section>

      <section>
        <GridLayout minItemWidth="200px">
          <Card>
            <Card.Content>
              <Text as="h3" align="center">
                Génération de composants
              </Text>
              <Text>
                Créez rapidement des composants React avec une structure adaptée
                au projet.
              </Text>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Text as="h3" align="center">
                Choix de la destination
              </Text>
              <Text>
                Créez rapidement des composants React avec une structure adaptée
                au projet.
                <br />
                • une application
                <br />
                • un package
                <br />• l’outil de supervision
              </Text>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Text as="h3" align="center">
                Templates réutilisables
              </Text>
              <Text>
                Les fichiers sont générés à partir de templates pour garantir une
            structure cohérente dans tout le projet.
              </Text>
            </Card.Content>
          </Card>
        </GridLayout>
      </section>

      <section>
        <Card>
            <Card.Content>
                <Text as="h2">Types de fichiers générés</Text>
                <Text><span>Composants React</span>
          <span>Hooks personnalisés</span>
          <span>Fonctions utilitaires</span>
          <span>Services</span>
          <span>Modules</span>
          <span>Templates personnalisés</span></Text>
            </Card.Content>
        </Card>
      </section>
    </div>
  );
};
