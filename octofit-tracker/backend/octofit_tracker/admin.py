from django.contrib import admin
from .models import OctofitUser, Team, Activity, LeaderboardEntry, Workout


@admin.register(OctofitUser)
class OctofitUserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'team', 'created_at')
    search_fields = ('name', 'email', 'team')
    ordering = ('name',)


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'member_count', 'created_at')
    search_fields = ('name',)

    def member_count(self, obj):
        return len(obj.members or [])
    member_count.short_description = 'member count'


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'activity', 'duration', 'performed_at')
    search_fields = ('user', 'activity')
    ordering = ('-performed_at',)


@admin.register(LeaderboardEntry)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ('team', 'points', 'updated_at')
    search_fields = ('team',)
    ordering = ('-points',)


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('name', 'suggested_for', 'duration_minutes', 'created_at')
    search_fields = ('name', 'suggested_for')
    ordering = ('name',)
