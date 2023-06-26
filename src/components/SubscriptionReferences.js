// src/components/SubscriptionsReferences.js
import React, { useState, useEffect } from 'react';

const SubscriptionReferences = () => {
  // On initialise deux états : subscriptions pour stocker les données récupérées, et error pour stocker une éventuelle erreur
const [subscriptions, setSubscriptions] = useState([]);
const [error, setError] = useState(null);

// On définit une fonction asynchrone qui permet de récupérer les données d'une url spécifique
const fetchData = async (url) => {
  try {
    // On fait une requête fetch à l'url spécifiée
    const response = await fetch(url);

    // Si la réponse n'est pas ok (statut HTTP différent de 200), on lance une erreur
    if (!response.ok) {
      throw new Error(`Erreur HTTP! status: ${response.status}`);
    }

    // Si la réponse est ok, on récupère les données en format JSON
    const data = await response.json();

    // On met à jour l'état subscriptions avec les données récupérées
    setSubscriptions(data);

    // On met à jour l'état error à null car la requête a réussi
    setError(null);
  } catch (error) {
    // Si une erreur se produit pendant la requête, on met à jour l'état error avec le message d'erreur
    setError(error.message);

    // On met également à jour l'état subscriptions à un tableau vide car la requête a échoué
    setSubscriptions([]);
  }
};

// On définit une fonction pour récupérer toutes les données en appelant la fonction fetchData avec l'url de toutes les subscriptions
const fetchAllData = () => {
  fetchData('http://localhost:5000/subscriptions');
};

// On définit une fonction pour récupérer uniquement les données filtrées en appelant la fonction fetchData avec l'url des subscriptions filtrées
const fetchFilteredData = () => {
  fetchData('http://localhost:5000/filtered-subscriptions');
};

  

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className="container">
    <h1>Références des souscriptions</h1>
    <button className="btn btn-primary" onClick={fetchAllData}>Afficher toutes les données</button>
    <button className="btn btn-success" onClick={fetchFilteredData}>Afficher les données filtrées</button>
    {error && <div className="alert alert-danger">Erreur: {error}</div>}
    {subscriptions.length > 0 ? (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Type d'abonnement</th>
            <th>Référence de contrat</th>
            <th>Durée</th>
            <th>Date de début</th>
            <th>Actif</th>
            <th>Méthode de paiement</th>
            <th>Annulé</th>
            <th>Statut actuel</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription, index) => (
            <tr key={index}>
              <td>{subscription.SubscriptionType?.name}</td>
              <td>{subscription.contract_reference}</td>
              <td>{subscription.duration} mois</td>
              <td>{new Date(subscription.start_date).toLocaleDateString()}</td>
              <td>{subscription.active ? 'Oui' : 'Non'}</td>
              <td>{subscription.payment_method}</td>
              <td>{subscription.canceled ? 'Oui' : 'Non'}</td>
              <td>{subscription.current_status}</td>
              <td>{new Date(subscription.ended_on).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="alert alert-info">Pas de souscriptions disponibles.</div>
    )}
  </div>
  );
};

export default SubscriptionReferences;
