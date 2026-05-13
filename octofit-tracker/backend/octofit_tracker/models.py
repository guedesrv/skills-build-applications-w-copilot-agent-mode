from djongo import models


class OctofitUser(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'users'
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def __str__(self):
        return self.name


class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    members = models.JSONField(blank=True, default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'teams'
        verbose_name = 'team'
        verbose_name_plural = 'teams'

    def __str__(self):
        return self.name


class Activity(models.Model):
    user = models.CharField(max_length=100)
    activity = models.CharField(max_length=150)
    duration = models.IntegerField(help_text='Duration in minutes')
    performed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'activities'
        verbose_name = 'activity'
        verbose_name_plural = 'activities'

    def __str__(self):
        return f"{self.user} - {self.activity}"


class LeaderboardEntry(models.Model):
    team = models.CharField(max_length=100)
    points = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'leaderboard'
        verbose_name = 'leaderboard entry'
        verbose_name_plural = 'leaderboard'

    def __str__(self):
        return f"{self.team}: {self.points}"


class Workout(models.Model):
    name = models.CharField(max_length=150)
    suggested_for = models.CharField(max_length=100, blank=True)
    duration_minutes = models.IntegerField(default=30)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'workouts'
        verbose_name = 'workout'
        verbose_name_plural = 'workouts'

    def __str__(self):
        return self.name
