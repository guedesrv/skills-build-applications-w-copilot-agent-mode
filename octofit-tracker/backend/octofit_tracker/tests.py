from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import OctofitUser, Team, Activity, LeaderboardEntry, Workout


class OctofitTrackerTests(APITestCase):
    def setUp(self):
        OctofitUser.objects.create(name='Tony Stark', email='ironman@marvel.com', team='marvel')
        Team.objects.create(name='marvel', members=['Tony Stark'])
        Activity.objects.create(user='Tony Stark', activity='Suit Training', duration=45)
        LeaderboardEntry.objects.create(team='marvel', points=300)
        Workout.objects.create(name='Tech Endurance', suggested_for='marvel', duration_minutes=30)

    def test_api_root(self):
        url = reverse('api-root')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)

    def test_users_endpoint(self):
        url = reverse('users-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_teams_endpoint(self):
        url = reverse('teams-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_activities_endpoint(self):
        url = reverse('activities-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_leaderboard_endpoint(self):
        url = reverse('leaderboard-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_workouts_endpoint(self):
        url = reverse('workouts-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
